import React, { useState, useEffect, useCallback } from "react";
import "./AdminPromotionsSlider.css";

const AdminPromotionsSlider = () => {
  const [promotions, setPromotions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPromoId, setSelectedPromoId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imagePath: "",
    catchPhrase: "",
  });

  const BASE_URL = "http://localhost:5010/api/Promotions";

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => setPromotions(data))
      .catch((err) => console.error("Failed to load promotions", err));
  }, []);

  useEffect(() => {
    if (promotions.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, promotions.length]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 50) {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }
    if (touchStart - touchEnd < -50) {
      setCurrentSlide((prev) =>
        prev === 0 ? promotions.length - 1 : prev - 1
      );
    }
  }, [touchStart, touchEnd, promotions.length]);

  const goToSlide = (index) => setCurrentSlide(index);

  const openAddModal = () => {
    setFormData({ title: "", description: "", imagePath: "", catchPhrase: "" });
    setSelectedPromoId(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const openEditModal = (promo) => {
    setFormData({
      title: promo.title,
      description: promo.description,
      imagePath: promo.imagePath,
      catchPhrase: promo.catchPhrase,
    });
    setSelectedPromoId(promo.promotionID);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        // Edit mode: PUT
        const res = await fetch(`${BASE_URL}/${selectedPromoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, promotionID: selectedPromoId }),
        });
        if (res.ok) {
          setPromotions((prev) =>
            prev.map((promo) =>
              promo.promotionID === selectedPromoId
                ? { ...promo, ...formData }
                : promo
            )
          );
        }
      } else {
        // Add mode: POST
        const res = await fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const created = await res.json();
          setPromotions([...promotions, created]);
        }
      }
      setShowModal(false);
    } catch (err) {
      console.error("Error saving promotion", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPromotions(promotions.filter((promo) => promo.promotionID !== id));
      }
    } catch (err) {
      console.error("Error deleting promotion", err);
    }
  };

  return (
    <div className="promotion-slider">
      <div
        className="slider-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {promotions.map((promo) => (
          <div key={promo.promotionID} className="slide">
            <div className="slide-image">
              <img
                src={promo.imagePath}
                alt={promo.title}
                className="promo-image"
              />
            </div>
            <div className="slide-content">
              <h3>{promo.title}</h3>
              <p>
                {promo.description.length > 60
                  ? promo.description.substring(0, 60) + "..."
                  : promo.description}
              </p>
              <p className="catch-phrase">{promo.catchPhrase}</p>
              <div className="button-group">
                <button className="cta-button" onClick={openAddModal}>
                  Add New
                </button>
                <button
                  className="cta-button"
                  onClick={() => openEditModal(promo)}
                >
                  Edit
                </button>
                <button
                  className="cta-button"
                  onClick={() => handleDelete(promo.promotionID)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {promotions.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h3>{isEditMode ? "Edit Promotion" : "Add Promotion"}</h3>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="imagePath"
              placeholder="Image Path (e.g., /images/Promo5.png)"
              value={formData.imagePath}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="catchPhrase"
              placeholder="Catch Phrase"
              value={formData.catchPhrase}
              onChange={handleInputChange}
            />
            <div className="modal-actions">
              <button className="cta-button" onClick={handleSubmit}>
                {isEditMode ? "Update" : "Save"}
              </button>
              <button
                className="cta-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPromotionsSlider;
