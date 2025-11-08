# ⚙️ SERVER SIDE (Express + MongoDB + Firebase)

## 🗂️ 1. Basic Express Server Setup

```js
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Simple CRUD server is running.");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
```

## 🧩 2. Connect MongoDB to Express

```js
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z1gnsog.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const modelsDB = client.db("modelsDB");
    const modelsCollection = modelsDB.collection("models");

    app.get("/models", async (req, res) => {
      const cursor = modelsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "✅ Pinged your deployment. Yor are successfully connected to MongoDB!"
    );
  } finally {
    // Optionally close the client when needed
  }
}
run().catch(console.dir);
```

## 🔐 3. Verify Firebase Token Middleware

```js
const verifyFirebaseToken = async (req, res, next) => {
  // console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const userInfo = await admin.auth().verifyIdToken(token);
    req.token_email = userInfo.email;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
};
```

## 📂 4. Protected Route – Get My Models

```js
app.get("/myModels", verifyFirebaseToken, async (req, res) => {
  const email = req.query.email;
  const query = {};
  if (email) {
    if (email !== req.token_email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    query.created_by = email;
  }
  const cursor = modelsCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
});
```

## 🔍 5. Search Functionality

### Server Side

```js
app.get("/search", async (req, res) => {
  const searchText = req.query.search;
  const query = { name: { $regex: searchText, $options: "i" } };
  const cursor = modelsCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
});
```

### Client Side

```js
const handleSearch = (e) => {
  e.preventDefault();
  const searchText = e.target.search.value;
  setModelLoading(true);
  axiosPublic(`/search?search=${searchText}`).then((data) => {
    setModels(data.data);
    setModelLoading(false);
  });
};
```
## ⬇️ 6. Update Download Count
## Server Side
```js
app.post("/downloads/:id", verifyFirebaseToken, async (req, res) => {
  const downloadedModel = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const update = {
    $inc: {
      downloads: 1,
    },
  };
  const updatedDownloadCount = await modelsCollection.updateOne(query, update);

  const result = await downloadCollection.insertOne(downloadedModel);
  res.send(result);
});
```

## Client Side
```js
const handleDownload = () => {
  const newModel = {
    name: model.name,
    category: model.category,
    description: model.description,
    thumbnailUrl: model.thumbnailUrl,
    created_by: model.created_by,
    created_at: model.created_at,
    downloads: model.downloads,
    downloaded_by: user.email,
  };

  axiosSecure.post(`/downloads/${id}`, newModel).then((data) => {
    // console.log("after downloaded", data.data);
    if (data.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Model has been Downloaded",
        showConfirmButton: false,
        timer: 1500,
      });
      setRefetch(!refetch); // for updating download count in UI instantly
    }
  });
};
```
## 7. 🚀 Vercel Deployment Guide
### 🥇 1. First-Time Setup

*(Skip this step if you already have Vercel installed and logged in.)*
```js
npm i -g vercel
vercel login
vercel
```
### 🧩 2. Before Deployment

✅ Make sure to:

 - Comment out these two lines in your index.js (to avoid connection errors on serverless deploy):
```js
// await client.connect();
// await client.db("admin").command({ ping: 1 });
```
### 🗂️ 3. Create `vercel.json`

In your project root directory, add a `vercel.json` file:
```js
{
  "version": 2,
  "builds": [
    { "src": "index.js", "use": "@vercel/node" }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}
```
### 🚀 4. Deploy to Vercel
```js
vercel
```
   You’ll get a series of questions — here’s an example with answers you should give 👇

### 5. 💬 Vercel CLI Questions & Answers
```js
? Set up and deploy “D:\PH\Backend\3D-model-hub\3d-model-hub-server”? → yes
? Which scope should contain your project? → Tanij Roy's projects
? Link to existing project? → no
? What’s your project’s name? → 3d-model-hub-server
? In which directory is your code located? → ./
? Want to modify these settings? → no
? Do you want to change additional project settings? → no
? Detected a repository. Connect it to this project? → no
```
### 🔁 5. Redeploy Command

Once setup is complete, you can redeploy anytime using:
```js
vercel --prod
```

This command pushes your latest changes directly to production.




# 💻 CLIENT SIDE (React + Firebase + Tailwind + DaisyUI)

## 🎨 1. Tailwind & DaisyUI Theme Setup (`index.css`)

```js
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default;
 }
@plugin "daisyui/theme" {
  name: "light";
  default: true;
  --color-primary: #403F3F;
  --color-secondary: #D72050;
  --color-base-200: #E9E9E9;
  --color-base-300: #D9D9D9;
  --color-accent: #001931;
  --color-accent-content: #627382;
}

*{
  font-family: "Inter", sans-serif;
}

.myNavLink{
  @apply text-lg font-semibold border-b-2 border-white
}
.myNavLink:hover{
  @apply bg-linear-to-r from-blue-500 to-red-500 bg-clip-text text-transparent bg-white
}
.myNavLink.active{
  @apply border-blue-500 bg-linear-to-r from-blue-500 to-red-500 bg-clip-text text-transparent
}


.btn-primary {
  @apply bg-linear-to-r from-[#632EE3] to-[#9F62F2] border-none
}
.btn-primary:hover{
  @apply opacity-90
}
```

## 🧭 2. React Router Configuration

```js
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allModels",
        Component: AllModels,
      },
      {
        path: "createModel",
        Component: CreateModel,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
```

## 🔐 3. Firebase Authentication – Login Page

```js
const Login = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="flex-1 flex items-center justify-center bg-linear-to-br from-indigo-700 via-purple-600 to-pink-500 py-8 px-4">
      <div className="card bg-white/20 backdrop-blur-md w-full max-w-sm mx-auto shrink-0 shadow-2xl text-white border border-white/30">
        <div className="card-body">
          <h1 className="animate__animated animate__bounceInUp text-center text-xl font-bold mb-2 text-[#F7B267]">
            Sign In & Keep Your Pets Cozy
          </h1>
          <form>
            <fieldset className="fieldset">
              <label className="label text-white">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered bg-white/70 text-black placeholder-gray-600"
                placeholder="Email"
                required
              />

              <div className="relative">
                <label className="label text-white mt-3">Password</label>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="input input-bordered bg-white/70 text-black placeholder-gray-600"
                  placeholder="Password"
                  required
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer absolute z-10 top-11 right-5"
                >
                  {showPass ? (
                    <FaEye className="text-black"></FaEye>
                  ) : (
                    <FaEyeSlash className="text-black"></FaEyeSlash>
                  )}
                </span>
              </div>

              <div className="mt-2">
                <Link
                  to={`/forgetPassword`}
                  type="button"
                  className="link link-hover font-medium text-[#F7B267]"
                >
                  Forgot password?
                </Link>
              </div>

              <button className="btn mt-5 bg-[#E38B29] hover:bg-[#F7B267] border-0 text-white font-semibold">
                Login
              </button>
            </fieldset>
          </form>
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-white/30"></div>
            <span className="text-sm text-white/70">or</span>
            <div className="h-px w-16 bg-white/30"></div>
          </div>
          {/* Google */}
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <div className="flex gap-2">
            <span className="">Don’t have an account yet?</span>
            <Link
              to={`/auth/register`}
              className="text-orange-6 text-[#F7B267] font-semibold hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## 🧑‍💻 4. Auth Provider Setup

```js
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const googleSignUser = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  const resetPassWord = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    setUser,
    loading,
    signUpUser,
    signInUser,
    signOutUser,
    googleSignUser,
    updateUser,
    resetPassWord,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};
```

## 📝 5. Register Page Validation & Error Handling

```js
const { setUser, signUpUser, updateUser, googleSignUser } = use(AuthContext);
const navigate = useNavigate();

const handleSignUp = (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const photoURL = e.target.photoURL.value;
  const name = e.target.name.value;

  const regExp = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%?&#^()\-_=+]{6,}$/;
  if (!regExp.test(password)) {
    toast.error(
      "Password must be at least 6 characters long and include at least one uppercase and one lowercase letter"
    );
    return;
  }

  signUpUser(email, password)
    .then((result) => {
      const currentUser = result.user;

      updateUser({ displayName: name, photoURL: photoURL })
        .then(() => {
          setUser({ ...currentUser, displayName: name, photoURL: photoURL });
        })
        .catch((e) => {
          console.log(e);
          setUser(currentUser);
        });

      e.target.reset();
      toast.success("Account created successfully.");
      navigate("/");
    })
    .catch((e) => {
      console.log(e);
      if (e.code === "auth/email-already-in-use") {
        toast.error("User already exists in the database.");
      } else if (e.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters long.");
      } else if (e.code === "auth/invalid-email") {
        toast.error("Invalid email format. Please check your email.");
      } else if (e.code === "auth/user-not-found") {
        toast.error("User not found. Please sign up first.");
      } else if (e.code === "auth/wrong-password") {
        toast.error("Wrong password. Please try again.");
      } else if (e.code === "auth/user-disabled") {
        toast.error("This user account has been disabled.");
      } else if (e.code === "auth/too-many-requests") {
        toast.error("Too many attempts. Please try again later.");
      } else if (e.code === "auth/operation-not-allowed") {
        toast.error("Operation not allowed. Please contact support.");
      } else if (e.code === "auth/network-request-failed") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(e.message || "An unexpected error occurred.");
      }
    });
};
```

## 🔒 6. useAxiosSecure (Interceptors)

```js
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    const requestInterceptor = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    });
    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          console.log("Loging out user due to bad request...");
          signOutUser().then(() => {
            navigate("/auth/login");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, loading, signOutUser, navigate]);
  return instance;
};
```

## 🚪 7. Private Route

```js
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <h1 className="text-center py-30">
        <span className="loading loading-bars loading-xl"></span>
      </h1>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={location?.pathname} to={`/auth/login`}></Navigate>;
};
```

## 🌙 8. Dark Theme Toggle Support

```js
// index.css
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
}

// JSX usage
<input type="checkbox" onChange={(e)=>handleTheme(e.target.checked)} defaultChecked={theme==="dark"? true : false} className="toggle" />

// Functionality
const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

useEffect(()=> {
  const html = document.querySelector("html");
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
},[theme])
const handleTheme = (checked) => {
  setTheme( checked ? "dark" : "light");
}
```


# 🔧 CRUD OPERATIONS

## ✏️ Update Model

### Client Side
```js
const handleUpdateModel = (e) => {
  e.preventDefault();
  const updateModel = {
    name: e.target.name.value,
    category: e.target.category.value,
    thumbnailUrl: e.target.thumbnailUrl.value,
    description: e.target.description.value,
  };
  axiosPublic.patch(`/models/${id}`, updateModel).then((data) => {
    // console.log("after updated model", data);
    if (data.data.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }
  });
};
```

### Server Side

```js
app.patch("/models/:id", async (req, res) => {
  const id = req.params.id;
  const updatedModel = req.body;
  const query = { _id: new ObjectId(id) };
  const update = {
    $set: {
      name: updatedModel.name,
      category: updatedModel.category,
      thumbnailUrl: updatedModel.thumbnailUrl,
      description: updatedModel.description,
    },
  };
  const result = await modelsCollection.updateOne(query, update);
  res.send(result);
});
```

---
