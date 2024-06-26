"use client";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import GearSelector from "./selectCategories";
import { addAdvertisement } from "../../../actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useScopedI18n } from "../../../locales/client";
import { BASE_URL } from "../../../api";
import { MainProductFormData } from "../../../types";
import { useRouter } from "next/navigation";

export const cities = [
  "თბილისი",
  "აბაშა",
  "ადიგენი",
  "ამბროლაური",
  "ასპინძა",
  "ახალქალაქი",
  "ახალციხე",
  "ახმეტა",
  "ბათუმი",
  "ბაღდათი",
  "ბოლნისი",
  "ბორჯომი",
  "გარდაბანი",
  "გორი",
  "გურჯაანი",
  "დედოფლისწყარო",
  "დმანისი",
  "დუშეთი",
  "ვანი",
  "ზესტაფონი",
  "ზუგდიდი",
  "თეთრიწყარო",
  "თელავი",
  "თერჯოლა",
  "თიანეთი",
  "კასპი",
  "ლაგოდეხი",
  "ლანჩხუთი",
  "ლენტეხი",
  "მარნეული",
  "მარტვილი",
  "მესტია",
  "მცხეთა",
  "ნინოწმინდა",
  "ოზურგეთი",
  "ონი",
  "რუსთავი",
  "საგარეჯო",
  "სამტრედია",
  "საჩხერე",
  "სენაკი",
  "სიღნაღი",
  "ტყიბული",
  "ფოთი",
  "ქარელი",
  "ქედა",
  "ქობულეთი",
  "ქუთაისი",
  "სტეფანწმინდა",
  "ყვარელი",
  "შუახევი",
  "ჩოხატაური",
  "ჩხოროწყუ",
  "ცაგერი",
  "წალენჯიხა",
  "წალკა",
  "წყალტუბო",
  "ჭიათურა",
  "ხარაგაული",
  "ხაშური",
  "ხელვაჩაური",
  "ხობი",
  "ხონი",
  "ხულო",
  "ოქროყანა",
];

const MainProductField = () => {
  const { user } = useUser();
  const t = useScopedI18n("addProduct");
  const route = useRouter();

  const [formData, setFormData] = useState<MainProductFormData>({
    user_id: "",
    type: "",
    category: "",
    subcategory: "",
    shoe_size: "",
    clothing_size: "",
    backpack_capacity: "",
    tent_capacity: "",
    main_photo: "",
    photo_urls: ["", "", ""],
    title_ge: "",
    description_ge: "",
    title_en: "",
    description_en: "",
    price: "0",
    condition: "",
    quantity: "",
    negotiable: false,
    location: "თბილისი",
    first_name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const inputFileRef = useRef<HTMLInputElement>(null);
  const additionalFileRefs = useRef<(HTMLInputElement | null)[]>([
    null,
    null,
    null,
  ]);

  useEffect(() => {
    if (user && user.sub) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user_id: user.sub || "",
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    if (name.startsWith("photo_urls")) {
      const index = parseInt(e.target.id.split("-")[2]);
      setFormData((prevData) => {
        const newPhotoUrls = [...prevData.photo_urls];
        newPhotoUrls[index] = value;
        return {
          ...prevData,
          photo_urls: newPhotoUrls,
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};
    const requiredFields = [
      "type",
      "category",
      "title_ge",
      "price",
      "location",
      "condition",
      "quantity",
      "first_name",
      "phone",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        valid = false;
        newErrors[field] = "ეს ველი შესავსებია*";
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(
      `${BASE_URL}/api/avatar/upload?filename=${file.name}`,
      {
        method: "POST",
        body: file,
      }
    );

    const newBlob = await response.json();

    setFormData((prevData) => ({
      ...prevData,
      main_photo: newBlob.url,
    }));
  };

  const handleAdditionalUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!event.target.files) {
      throw new Error("No file selected");
    }

    const file = event.target.files[0];

    const response = await fetch(
      `${BASE_URL}/api/avatar/upload?filename=${file.name}`,
      {
        method: "POST",
        body: file,
      }
    );

    const newBlob = await response.json();

    setFormData((prevData) => {
      const newPhotoUrls = [...prevData.photo_urls];
      newPhotoUrls[index] = newBlob.url;
      return {
        ...prevData,
        photo_urls: newPhotoUrls,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await addAdvertisement(formData);
        route.push("/products");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="add-product-layout">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="add-product-detail-container">
            <h2>{t("advertisementType")}*</h2>
            <div className="add-product-type">
              <div>
                <input
                  type="radio"
                  name="type"
                  id="sell"
                  value="sell"
                  onChange={handleInputChange}
                />
                <label htmlFor="sell" className="form-control">
                  {t("sell")}
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="type"
                  id="rent"
                  value="rent"
                  onChange={handleInputChange}
                />
                <label htmlFor="rent">{t("rent")}</label>
              </div>
              {errors.type && (
                <p className="text-red-500 mt-[4px]">{errors.type}</p>
              )}
            </div>
          </div>
          <div className="add-product-detail-container">
            <h2>{t("chooseCategory")}*</h2>
            <GearSelector
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          </div>
        </div>
        <div className="add-product-main-img">
          <div className="add-product-detail-container">
            <h2>{t("addImage")}</h2>
            <p>{t("morePeopleWill")}</p>
            <span>{t("chooseFromDevice")}</span>
            <input
              type="file"
              name="file"
              ref={inputFileRef}
              onChange={handleUpload}
            />
            <label htmlFor="img-url">{t("orUploadWithUrl")}:</label>
            <input
              type="text"
              name="main_photo"
              placeholder={t("uploadOrPasteUrl")}
              id="img-url"
              value={formData.main_photo}
              onChange={handleInputChange}
              disabled={!!formData.main_photo}
            />
            <span>{t("pasteAdditionalUrl")}:</span>
            {formData.photo_urls.map((photoUrl, index) => (
              <div className="add-products-additional-img" key={index}>
                <span>{index + 1}</span>
                <div>
                  <input
                    type="file"
                    // @ts-ignore
                    ref={(el) => (additionalFileRefs.current[index] = el)}
                    onChange={(e) => handleAdditionalUpload(e, index)}
                  />
                  <input
                    type="text"
                    name="photo_urls"
                    id={`img-additional-${index}`}
                    value={photoUrl}
                    placeholder={t("pasteAdditionalUrl")}
                    onChange={handleInputChange}
                    disabled={!!photoUrl}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="add-product-description">
          <div className="add-product-detail-container">
            <h2>{t("descGe")}</h2>
            <label htmlFor="title_ge">{t("title")}*</label>
            <input
              type="text"
              placeholder={t("titleGe")}
              name="title_ge"
              id="title"
              onChange={handleInputChange}
            />
            {errors.title_ge && (
              <p className="text-red-500 mt-[4px]">{errors.title_ge}</p>
            )}
            <label htmlFor="description_ge">{t("Desc")}</label>
            <textarea
              id="description"
              name="description_ge"
              placeholder={t("descInGe")}
              onChange={handleInputChange}
              rows={5}
            ></textarea>
            <h2>{t("title")}</h2>
            <label htmlFor="title_en">სათაური</label>
            <input
              type="text"
              placeholder={t("writeTitleEn")}
              name="title_en"
              id="entitle"
              onChange={handleInputChange}
            />
            <label htmlFor="description_en">{t("descEn")}</label>
            <textarea
              id="endescription"
              placeholder={t("writeDescInGe")}
              name="description_en"
              onChange={handleInputChange}
              rows={5}
            ></textarea>
          </div>
        </div>

        <div className="add-product-detail-container">
          <div className="add-product-price">
            <h2>{t("productPrice")}*</h2>
            <label htmlFor="quantity">{t("price")}:</label>
            <input
              type="number"
              placeholder={t("writePrice")}
              name="price"
              id="price"
              onChange={handleInputChange}
            />
            <div className="flex items-center	gap-[5px] mt-[15px]">
              <input
                type="checkbox"
                name="negotiable"
                id="negotiable"
                onChange={handleInputChange}
                className="my-0"
              />
              <label htmlFor="negotiable">{t("negotiable")}</label>
            </div>
          </div>
        </div>

        <div className="add-product-condition-quantity">
          <div className="add-product-detail-container">
            <div className="add-product-price">
              <h2>{t("productConditionQuantity")}*</h2>
              <div className="add-product-type mb-[20px]">
                <div>
                  <input
                    type="radio"
                    name="condition"
                    id="new"
                    value="new"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="new" className="form-control">
                    {t("new")}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="condition"
                    placeholder="რაოდენობა"
                    id="used"
                    value="used"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="used" className="form-control">
                    {t("used")}
                  </label>
                </div>
                {errors.type && (
                  <p className="text-red-500 mt-[4px]">{errors.type}</p>
                )}
              </div>
              <label htmlFor="quantity">{t("quantity")}:</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                placeholder={t("writeQuantity")}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="add-product-contact">
          <div className="add-product-detail-container">
            <h2>{t("contactInfo")}</h2>
            <label htmlFor="location">{t("chooseLocation")}*</label>
            <select name="location" onChange={handleInputChange}>
              {cities.map((city, index) => (
                <option key={`select-cities-${index}`} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="text-red-500 mt-[4px]">{errors.location}</p>
            )}
            <div>
              <label htmlFor="firstName">{t("name")}*</label>
              <input
                type="text"
                name="first_name"
                placeholder={t("writeYourName")}
                id="firstName"
                onChange={handleInputChange}
              />
              {errors.first_name && (
                <p className="text-red-500 mt-[4px]">{errors.first_name}</p>
              )}
              <label htmlFor="phone">{t("mobileNumber")}*</label>
              <input
                type="number"
                name="phone"
                placeholder={t("writeYourNumber")}
                id="phone"
                onChange={handleInputChange}
              />
              {errors.phone && (
                <p className="text-red-500 mt-[4px]">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>
        <div className="button-container">
          {user?.sub && <button type="submit">{t("add")}</button>}
        </div>
      </form>
    </div>
  );
};

export default MainProductField;
