import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Address, Button, Loading, Overview } from "../../components";
import { apiCreatePost, apiUpdatePost, apiUploadImages } from "../../services";
import { getCodes, getCodesArea } from "../../ultils/Common/getCodes";
import validate from "../../ultils/Common/validateFields";
import icons from "../../ultils/icons";

const { BsCameraFill, ImBin } = icons;

const CreatePost = ({ isEdit, dataEdit, setIsEdit }) => {
    // console.log(dataEdit)
    const [payload, setPayload] = useState(() => {
        const initData = {
            categoryCode: dataEdit?.categoryCode || "",
            title: dataEdit?.title || "",
            priceNumber: dataEdit?.priceNumber * 1000000 || "",
            areaNumber: dataEdit?.areaNumber || "",
            images: dataEdit?.images || "",
            address: dataEdit?.address || "",
            priceCode: dataEdit?.priceCode || "",
            areaCode: dataEdit?.areaCode || "",
            description: dataEdit?.description || "",
            target: dataEdit?.target || "",
            province: dataEdit?.province || "",
        };
        return initData;
    });
    const [imagesPreview, setImagesPreview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { prices, areas, categories, provinces } = useSelector(
        (state) => state.app
    );
    const { currentData } = useSelector((state) => state.user);
    const [invalidFields, setInvalidFields] = useState([]);

    const handleFiles = async (e) => {
        e.stopPropagation();
        setIsLoading(true);
        let images = [];
        let files = e.target.files;
        let formData = new FormData();
        for (let i of files) {
            formData.append("file", i);

            formData.append("upload_preset", "mxy7pgvk");

            // formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
            let response = await apiUploadImages(formData);
            if (response.status === 200)
                images = [...images, response.data?.secure_url];
        }
        setIsLoading(false);
        setImagesPreview((prev) => [...prev, ...images]);
        setPayload((prev) => ({
            ...prev,
            images: !isEdit
                ? [...prev.images, ...images]
                : [...JSON.parse(payload.images), ...images],
        }));
    };
    const handleDeleteImage = (image) => {
        setImagesPreview(imagesPreview?.filter((item) => item !== image));
        setPayload((prev) => ({
            ...prev,
            images: (isEdit
                ? JSON.parse(payload.images)
                : payload.images
            )?.filter((item) => item !== image),
        }));
    };

    const handleSubmit = async () => {
        let result = validate(payload, setInvalidFields);
        // if (result > 0) {
        //   console.log('Có lỗi trong form', invalidFields);
        //   return; // Ngừng thực hiện nếu có lỗi
        // }

        let priceCodeArr = getCodes(
            +payload.priceNumber / Math.pow(10, 6),
            prices,
            1,
            15
        );
        let priceCode = priceCodeArr[0]?.code;
        let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 0, 90);
        let areaCode = areaCodeArr[0]?.code;

        let finalPayload = {
            ...payload,
            priceCode,
            areaCode,
            userId: currentData.id,
            priceNumber: +payload.priceNumber / Math.pow(10, 6),
            target: payload.target || "Tat ca",
            label: `${
                categories?.find((item) => item.code === payload?.categoryCode)
                    .value
            } ${payload?.address?.split(",")[0]}`,
        };

        const response = isEdit
            ? await apiUpdatePost({ ...finalPayload, id: dataEdit.id })
            : await apiCreatePost(finalPayload);
        // console.log(response)

        if (response?.data.err === 0) {
            Swal.fire("Thành công ", "Đã thêm bài đăng mới", "success").then(
                () => {
                    setPayload({
                        categoryCode: "",
                        title: "",
                        priceNumber: 0,
                        areaNumber: 0,
                        images: [],
                        address: "",
                        priceCode: "",
                        areaCode: "",
                        description: "",
                        target: "",
                        province: "",
                    });
                }
            );
            setImagesPreview([]);
            if (isEdit) {
                setIsEdit(false);
            }
        } else {
            Swal.fire("Thất bại ", "Có lỗi gì đó", "error");
        }

        // if (priceCodeArr.length > 0) {
        //     let priceCode = priceCodeArr[priceCodeArr.length - 1]?.code
        //     console.log(priceCode)
        // } else {
        //     console.log('No price codes found.')
        // }
    };

    useEffect(() => {
        if (isEdit && dataEdit) {
            setPayload({
                ...dataEdit,
                categoryCode: dataEdit?.categoryCode || "",
                title: dataEdit?.title || "",
                priceNumber: dataEdit?.priceNumber * 1000000 || "",
                areaNumber: dataEdit?.areaNumber || "",
                images: dataEdit?.images?.image || "",
                address: dataEdit?.address || "",
                priceCode: dataEdit?.priceCode || "",
                areaCode: dataEdit?.areaCode || "",
                description: dataEdit?.description || "",
                target: dataEdit?.target || "",
                province: dataEdit?.province || "",
            });
            setImagesPreview(JSON.parse(dataEdit?.images?.image));
        }
    }, [isEdit, dataEdit]);

    return (
        <div className="px-6">
            <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
                {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
            </h1>
            <div className="flex gap-4">
                <div className="py-4 flex flex-col gap-8 flex-auto">
                    <Address
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        payload={payload}
                        setPayload={setPayload}
                    />
                    <Overview
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        payload={payload}
                        setPayload={setPayload}
                    />
                    <div className="w-full mb-6">
                        <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
                        <small>
                            Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
                        </small>
                        <div className="w-full">
                            <label
                                className="w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md"
                                htmlFor="file"
                            >
                                {isLoading ? (
                                    <Loading />
                                ) : (
                                    <div className="flex flex-col items-center justify-center">
                                        <BsCameraFill color="blue" size={50} />
                                        Thêm ảnh
                                    </div>
                                )}
                            </label>
                            <input
                                onChange={handleFiles}
                                value=""
                                hidden
                                type="file"
                                id="file"
                                multiple
                            />
                            <div className="w-full">
                                <h3 className="font-medium py-4">
                                    Ảnh đã chọn
                                </h3>
                                <div className="flex gap-4 items-center">
                                    {imagesPreview?.map((item) => {
                                        return (
                                            <div
                                                key={item}
                                                className="relative w-1/3 h-1/3 "
                                            >
                                                <img
                                                    src={item}
                                                    alt="preview"
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                                <span
                                                    title="Xóa"
                                                    onClick={() =>
                                                        handleDeleteImage(item)
                                                    }
                                                    className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                                                >
                                                    <ImBin />
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        text="Tạo mới"
                        bgColor="bg-green-600"
                        textColor="text-white"
                    />
                    {/* <div className="h-[500px]"></div> */}
                </div>
                {/* <div className="w-[30%] flex-none">
                    maps
                    <Loading />
                </div> */}
            </div>
        </div>
    );
};

export default CreatePost;
