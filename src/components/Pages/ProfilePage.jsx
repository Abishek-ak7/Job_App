import React, { useState, useEffect } from 'react';
import { Save, Edit, Trash2, X, Upload, LogOut } from 'lucide-react';
import Navbar from '../Navigation/Navbar';

const ProfileSection = ({ newUserData }) => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    profilePicture: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Get user token from localStorage
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    // If we have newUserData from registration, use it
    if (newUserData) {
      setProfile({
        ...profile,
        firstName: newUserData.firstName || '',
        lastName: newUserData.lastName || '',
        email: newUserData.email || '',
      });
      setLoading(false);
      setSuccessMessage('Registration successful! Welcome to your profile.');
      setTimeout(() => setSuccessMessage(''), 5000);
    } else if (token) {
      fetchProfile();
    } else {
      setLoading(false);
      setError('Please log in to view your profile');
    }
  }, [token, newUserData]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch profile');
      }
      
      const data = await response.json();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError('Error loading profile: ' + err.message);
      // If unauthorized, redirect to login
      if (err.message.includes('401') || err.message.includes('unauthorized')) {
        localStorage.removeItem('authToken');
        // Redirect to login page
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone,
          location: profile.location,
          profilePicture: profile.profilePicture
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      
      const data = await response.json();
      setIsEditing(false);
      setError(null);
      setSuccessMessage('Profile updated successfully');
      
      // Update profile with returned data if available
      if (data.profile) {
        setProfile(data.profile);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Error saving profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete account');
      }
      
      // Clear local storage and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/register?message=account-deleted';
      
    } catch (err) {
      setError('Error deleting account: ' + err.message);
      setDeleteConfirmOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size exceeds 5MB limit');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          profilePicture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/register';
  };

  if (loading && !profile.firstName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center py-8">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Navbar/>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 mb-4 rounded-md flex justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-50 text-green-600 p-3 mb-4 rounded-md flex justify-between">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage('')}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="space-x-2 flex">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <X className="w-4 h-4 mr-1" /> Cancel
                </button>
                <button 
                  onClick={saveProfile} 
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <Save className="w-4 h-4 mr-1" /> Save
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleLogout} 
                  className="bg-gray-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </button>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden mb-4">
                {profile.profilePicture ? (
                  <img 
                    src={profile.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              
              {isEditing && (
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center">
                  <Upload className="w-4 h-4 mr-1" /> Upload Photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>
          
          {/* Profile Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.firstName || ''}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                ) : (
                  <p className="text-gray-800">{profile.firstName || 'Not specified'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.lastName || ''}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-800">{profile.lastName || 'Not specified'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-800">{profile.email || 'Not specified'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-800">{profile.phone || 'Not specified'}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                ) : (
                  <p className="text-gray-800">{profile.location || 'Not specified'}</p>
                )}
              </div>
            </div>
            
            {/* Account Management */}
            {isEditing && (
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Account Management</h3>
                
                {!deleteConfirmOpen ? (
                  <button 
                    onClick={() => setDeleteConfirmOpen(true)} 
                    className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete Account
                  </button>
                ) : (
                  <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-red-600 mb-2">Are you sure you want to delete your account? This action cannot be undone.</p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setDeleteConfirmOpen(false)} 
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={deleteAccount} 
                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                      >
                        Confirm Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;