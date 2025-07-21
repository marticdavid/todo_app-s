import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import Spinner from "../layout/spinner";
import { toast } from "react-toastify";

function Profile() {
  const { isLoading, fetchProfile, profile, apiUrl } = useContext(storeContext);

  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const navigate = useNavigate();

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Populate form fields if editing
  useEffect(() => {
    if (profile && showForm) {
      setUserName(profile.userName || "");
      setBio(profile.bio || "");
      setName(profile.user?.name || "");
      setContact(profile.user?.contact || "");
      setGender(profile.user?.gender || "");
      setBirthDate(profile.user?.birthDate?.slice(0, 10) || "");
    }
  }, [profile, showForm]);

  function toggleForm() {
    setShowForm(!showForm);
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("todoApp_token")}`,
        },
        body: JSON.stringify({
          userName,
          bio,
          name,
          contact,
          gender,
          birthDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
        setShowForm(false);
        fetchProfile();
      } else {
        toast.error(data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating profile.");
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      {!profile ? (
        <p className="text-red-500">Profile not found</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Username: {profile.userName}
          </h2>
          <p className="mt-2 text-gray-700">
            Bio: {profile.bio || "No bio yet"}
          </p>
          <p className="mt-2 text-gray-700">Name: {profile.user?.name}</p>
          <p className="mt-2 text-gray-700">Email: {profile.user?.email}</p>
          <p className="mt-2 text-gray-700">
            Contact: {profile.user?.contact || "N/A"}
          </p>
          <p className="mt-2 text-gray-700">
            Gender: {profile.user?.gender || "N/A"}
          </p>
          <p className="mt-2 text-gray-700">
            DOB: {profile.user?.birthDate?.slice(0, 10) || "N/A"}
          </p>
          <p className="mt-2 text-gray-700">
            Role: {profile.user?.isAdmin ? "Admin" : "User"}
          </p>
        </div>
      )}

      <button
        onClick={toggleForm}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        {showForm ? "Cancel" : "Edit Profile"}
      </button>

      {showForm && (
        <form
          onSubmit={handleUpdateSubmit}
          className="mt-6 bg-white p-6 rounded shadow-md max-w-xl mx-auto"
        >
          <h3 className="text-xl font-bold mb-4">Update Profile</h3>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-700">Username</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded text-gray-700"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-700">Bio</label>
            <textarea
              className="w-full border px-3 py-2 rounded text-gray-700"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-700">Contact</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded text-gray-700"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-700">Gender</label>
            <select
              className="w-full border px-3 py-2 rounded text-gray-700"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-700">
              Birth Date
            </label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded text-gray-700"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </form>
      )}

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-6"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default Profile;
