import axios from "axios";

export const uploadImagesApiRequest = async (images:any, productId:any) => {
    const formData = new FormData();
    Array.from(images).forEach((image:any) => {
        formData.append("images", image);
    });
    const { data } = await axios.post("/api/products/admin/upload?productId=" + productId, formData);
    return data;
};

export const uploadImagesCloudinaryApiRequest = async (images: any, productId: any) => {
    const url = "https://api.cloudinary.com/v1_1/dnjsnv5vs/image/upload";
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        let file = images[i];
        formData.append("file", file);
        formData.append("upload_preset", "cxoec6zy");
    }

    try {
        const response = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        const data = await response.data;
        await axios.post("/api/products/admin/upload?cloudinary=true&productId=" + productId, data);
    } catch (error) {
        console.error("Error:", error);
    }
};
