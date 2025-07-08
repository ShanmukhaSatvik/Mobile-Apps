import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import Toast from "react-native-toast-message";
import { fetchMovieDetails, fetchPersonProfile } from "./api";
export const signUp = async ({ username, email, password }) => {
  try {
    const trimmedEmail = (email || "").trim();
    const trimmedUsername = (username || "").trim();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      trimmedEmail,
      password
    );
    const uid = userCredential.user.uid;
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      uid,
      username: trimmedUsername,
      email: trimmedEmail,
      saved_movies: {},
      saved_cast: {},
      watched_movies: {},
      watched_cast: {},
    });
    Toast.show({
      type: "success",
      text1: "Signup successful",
      text2: `Welcome ${trimmedUsername}!`,
    });
    return userCredential.user;
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Signup failed",
      text2: error.message,
    });
    throw error;
  }
};
export const login = async ({ email, password }) => {
  try {
    const trimmedEmail = (email || "").trim();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      trimmedEmail,
      password
    );
    const uid = userCredential.user.uid;
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.exists() ? userSnap.data() : null;
    Toast.show({
      type: "success",
      text1: "Login successful",
      text2: `Welcome back ${userData?.username || "user"}!`,
    });
    return userCredential.user;
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Login failed",
      text2: error.message,
    });
    throw error;
  }
};
export const isSaved = async (type, itemId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const field = type === "movie" ? "saved_movies" : "saved_cast";
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data() || {};
  const saved = userData[field] || {};
  return !!saved[itemId];
};
export const toggleSave = async (type, itemId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const field = type === "movie" ? "saved_movies" : "saved_cast";
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data() || {};
  const saved = userData[field] || {};
  const isSaved = !!saved[itemId];
  if (isSaved) {
    delete saved[itemId];
  } else {
    saved[itemId] = true;
  }
  await updateDoc(userRef, {
    [field]: saved,
  });
  return !isSaved;
};
export const fetchSavedMovieDetails = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return [];
    const userData = userSnap.data();
    const savedMovieIds = Object.keys(userData.saved_movies || {});
    const savedMovieDetails = await Promise.all(
      savedMovieIds.map((id) => fetchMovieDetails({ id }))
    );
    return savedMovieDetails;
  } catch (error) {
    throw error;
  }
};
export const fetchSavedPeopleDetails = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return [];
    const userData = userSnap.data();
    const savedPeopleIds = Object.keys(userData.saved_cast || {});
    const savedPeopleDetails = await Promise.all(
      savedPeopleIds.map((id) => fetchPersonProfile({ id }))
    );
    return savedPeopleDetails;
  } catch (error) {
    throw error;
  }
};
export const addWatchedMovie = async (movieId) => {
  const user = auth.currentUser;
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();
    if (data?.watched_movies?.[movieId]) return;
  }
  await updateDoc(userRef, {
    [`watched_movies.${movieId}`]: true,
  });
};
export const addWatchedCast = async (castId) => {
  const user = auth.currentUser;
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();
    if (data?.watched_cast?.[castId]) return;
  }
  await updateDoc(userRef, {
    [`watched_cast.${castId}`]: true,
  });
};
export const removeWatchedMovie = async (movieId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    [`watched_movies.${movieId}`]: deleteField(),
  });
};

export const removeWatchedCast = async (castId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    [`watched_cast.${castId}`]: deleteField(),
  });
};

export const fetchWatchedMovieDetails = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return [];
    const userData = userSnap.data();
    const watchedMovieIds = Object.keys(userData.watched_movies || {});
    const watchedMovieDetails = await Promise.all(
      watchedMovieIds.map((id) => fetchMovieDetails({ id }))
    );
    return watchedMovieDetails;
  } catch (error) {
    throw error;
  }
};
export const fetchWatchedPeopleDetails = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return [];
    const userData = userSnap.data();
    const watchedPeopleIds = Object.keys(userData.watched_cast || {});
    const watchedPeopleDetails = await Promise.all(
      watchedPeopleIds.map((id) => fetchPersonProfile({ id }))
    );
    return watchedPeopleDetails;
  } catch (error) {
    throw error;
  }
};
