import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://task-management-app-7goy.onrender.com/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProfile(response.data);
        setNewName(response.data.name);
        setNewEmail(response.data.email);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [token]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    axios
      .put(
        "https://task-management-app-7goy.onrender.com/api/profile",
        {
          name: newName,
          email: newEmail,
          password: newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Profile updated successfully!");
        setEditMode(false);
        setProfile({ name: newName, email: newEmail });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl text-white">
      <h2 className="text-3xl font-bold mb-4">User Profile</h2>
      {!editMode ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleUpdateProfile}
          className="bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">New Password (optional)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-4"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
