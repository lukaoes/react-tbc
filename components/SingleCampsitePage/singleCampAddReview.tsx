"use client";
import { useEffect, useState } from "react";
import { Campsite } from "../../types";
import AddBlogPicture from "../Blog/addBlogPicture";
import { useUser } from "@auth0/nextjs-auth0/client";
import { addCampReview } from "../../actions";

interface ICamp {
  camp: Campsite;
}

const SingleCampAddReview = ({ camp }: ICamp) => {
  const { user } = useUser();
  const [blobUrl, setBlobUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [review, setReview] = useState("");
  const [recommended, setRecommended] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    if (user && user.sub) {
      setUserId(user.sub);
    }
  }, [user]);

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (!blobUrl) {
      setPhotoUrl(url);
      if (url && !url.startsWith("https://") && !url.startsWith("http://")) {
        setPhotoError("Image URL is not correct");
      } else {
        setPhotoError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      photoUrl &&
      !photoUrl.startsWith("https://") &&
      !photoUrl.startsWith("http://")
    ) {
      setPhotoError("Image URL is not correct");
      return;
    }

    const formData = {
      user_id: userId,
      campsite_id: camp.id,
      review,
      main_photo: blobUrl || photoUrl,
      recommended,
    };

    try {
      await addCampReview(formData);
      setReview("");
      setBlobUrl("");
      setPhotoUrl("");
      setRecommended(true);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!user || !user.sub) {
    return (
      <div className="single-blog-add-comment">
        კომენტარის დასატოვებლად გაიარეთ{" "}
        <a href="/api/auth/login" className="underline">
          ავტორიზაცია
        </a>
      </div>
    );
  }

  return (
    <div className="single-camp-add-review">
      <h1>დატოვეთ განხილვა</h1>
      <AddBlogPicture setBlobUrl={setBlobUrl} />
      <form onSubmit={handleSubmit} className="single-blog-add-comment-form">
        <div>
          <label htmlFor="review">დაამატეთ შეფასება</label>
          <textarea
            placeholder="დაწერეთ შეფასება..."
            id="review"
            value={review}
            onChange={handleReviewChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="main_photo">სურათის URL</label>
          <input
            type="text"
            name="main_photo"
            id="main_photo"
            placeholder="ატვირთეთ ან ხელით ჩააკოპირეთ სურათის URL"
            value={blobUrl || photoUrl}
            onChange={handlePhotoUrlChange}
            disabled={!!blobUrl}
          />
          {photoError && <span className="error-message">{photoError}</span>}
        </div>
        <div className="campsite-add-recommend">
          <div
            className={recommended ? "camp-recommend" : ""}
            onClick={() => setRecommended(true)}
          >
            მომეწონა
          </div>
          <div
            className={!recommended ? "camp-recommend" : ""}
            onClick={() => setRecommended(false)}
          >
            არ მომეწონა
          </div>
        </div>
        <div className="add-comment-button">
          <button type="submit">დაკომენტარება</button>
        </div>
      </form>
    </div>
  );
};

export default SingleCampAddReview;
