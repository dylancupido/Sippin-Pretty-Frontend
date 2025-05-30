import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const ManageHomePage = () => {
  const [homeContent, setHomeContent] = useState({
    heroTitle: "Welcome to Sippin' Pretty",
    heroSubtitle: "We're not ordinary. We're made to shine, stand out, and carry ourselves with flair and confidence just like a perfectly crafted latte with a designer touch.",
    ctaText: "Book a Table",
    promotions: [
      { id: 1, title: "Happy Hour", description: "50% off all coffees between 2-4pm", imageUrl: "https://example.com/happy-hour.jpg", active: true },
      { id: 2, title: "Weekend Special", description: "Buy one pastry, get one free", imageUrl: "https://example.com/weekend.jpg", active: true },
      { id: 3, title: "Student Discount", description: "15% off with valid student ID", imageUrl: "https://example.com/student.jpg", active: false }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState({...homeContent});
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  // In a real app, you would fetch this data from your backend
  useEffect(() => {
    // Simulating API call
    const fetchHomeContent = async () => {
      try {
        // const response = await fetch('/api/home-content');
        // const data = await response.json();
        // setHomeContent(data);
        // setEditedContent(data);
        
        // Using mock data for now
        console.log("Home content would be fetched here");
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };

    fetchHomeContent();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePromotionChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedPromotions = [...editedContent.promotions];
    
    if (type === 'checkbox') {
      updatedPromotions[index] = {
        ...updatedPromotions[index],
        [name]: checked
      };
    } else {
      updatedPromotions[index] = {
        ...updatedPromotions[index],
        [name]: value
      };
    }
    
    setEditedContent(prev => ({
      ...prev,
      promotions: updatedPromotions
    }));
  };

  const handleSave = async () => {
    try {
      // In a real app, you would send this to your backend
      // const response = await fetch('/api/home-content', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(editedContent),
      // });
      
      // if (response.ok) {
      //   const updatedContent = await response.json();
      //   setHomeContent(updatedContent);
      // }
      
      // For now, just update the state directly
      setHomeContent(editedContent);
      setIsEditing(false);
      setSelectedPromotion(null);
      
      console.log("Content saved:", editedContent);
    } catch (error) {
      console.error("Error saving home content:", error);
    }
  };

  const handleCancel = () => {
    setEditedContent({...homeContent});
    setIsEditing(false);
    setSelectedPromotion(null);
  };

  const handleAddPromotion = () => {
    const newPromotion = {
      id: Date.now(), // temporary ID
      title: "New Promotion",
      description: "Description here",
      imageUrl: "https://example.com/placeholder.jpg",
      active: true
    };
    
    setEditedContent(prev => ({
      ...prev,
      promotions: [...prev.promotions, newPromotion]
    }));
    
    setSelectedPromotion(editedContent.promotions.length);
  };

  const handleDeletePromotion = (index) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      const updatedPromotions = [...editedContent.promotions];
      updatedPromotions.splice(index, 1);
      
      setEditedContent(prev => ({
        ...prev,
        promotions: updatedPromotions
      }));
      
      setSelectedPromotion(null);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Manage Home Page</h1>
        <p className="dashboard-date">Edit your homepage content and promotions</p>
      </div>
      
      <div className="dashboard-content">
        {!isEditing && !selectedPromotion ? (
          <div className="content-preview">
            <div className="preview-section">
              <h2>Hero Section</h2>
              <div className="preview-content">
                <h3>{homeContent.heroTitle}</h3>
                <p>{homeContent.heroSubtitle}</p>
                <button className="preview-button">{homeContent.ctaText}</button>
              </div>
            </div>
            
            <div className="preview-section">
              <h2>Promotions</h2>
              <div className="promotions-grid">
                {homeContent.promotions.map((promo, index) => (
                  <div 
                    key={promo.id} 
                    className={`promotion-card ${!promo.active ? 'inactive' : ''}`}
                    onClick={() => {
                      setSelectedPromotion(index);
                      setIsEditing(true);
                    }}
                  >
                    <div className="promotion-status">
                      {promo.active ? 'Active' : 'Inactive'}
                    </div>
                    <h3>{promo.title}</h3>
                    <p>{promo.description}</p>
                  </div>
                ))}
                <div 
                  className="promotion-card add-card"
                  onClick={handleAddPromotion}
                >
                  <div className="add-icon">+</div>
                  <p>Add New Promotion</p>
                </div>
              </div>
            </div>
            
            <button 
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Home Page Content
            </button>
          </div>
        ) : selectedPromotion !== null ? (
          <div className="edit-promotion">
            <h2>Edit Promotion</h2>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                name="title" 
                value={editedContent.promotions[selectedPromotion].title} 
                onChange={(e) => handlePromotionChange(e, selectedPromotion)} 
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea 
                name="description" 
                value={editedContent.promotions[selectedPromotion].description} 
                onChange={(e) => handlePromotionChange(e, selectedPromotion)} 
              />
            </div>
            
            <div className="form-group">
              <label>Image URL</label>
              <input 
                type="text" 
                name="imageUrl" 
                value={editedContent.promotions[selectedPromotion].imageUrl} 
                onChange={(e) => handlePromotionChange(e, selectedPromotion)} 
              />
            </div>
            
            <div className="form-group checkbox">
              <label>
                <input 
                  type="checkbox" 
                  name="active" 
                  checked={editedContent.promotions[selectedPromotion].active} 
                  onChange={(e) => handlePromotionChange(e, selectedPromotion)} 
                />
                Active
              </label>
            </div>
            
            <div className="button-group">
              <button className="save-button" onClick={handleSave}>Save Changes</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
              <button 
                className="delete-button" 
                onClick={() => handleDeletePromotion(selectedPromotion)}
              >
                Delete Promotion
              </button>
            </div>
          </div>
        ) : (
          <div className="edit-home-content">
            <h2>Edit Hero Section</h2>
            <div className="form-group">
              <label>Hero Title</label>
              <input 
                type="text" 
                name="heroTitle" 
                value={editedContent.heroTitle} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Hero Subtitle</label>
              <textarea 
                name="heroSubtitle" 
                value={editedContent.heroSubtitle} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="form-group">
              <label>CTA Button Text</label>
              <input 
                type="text" 
                name="ctaText" 
                value={editedContent.ctaText} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="button-group">
              <button className="save-button" onClick={handleSave}>Save Changes</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageHomePage;