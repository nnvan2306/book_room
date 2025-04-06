import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import "moment/locale/vi";
import { Button, UpdatePost } from "../../components";
import { apiDeleteOnePost, apiGetOnePost } from "../../services";
import Swal from "sweetalert2";

const ManagePost = () => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const { postOfCurrent } = useSelector((state) => state.post);
    const [idEdit, setIdEdit] = useState(0);

    useEffect(() => {
        dispatch(actions.getPostsLimitAdmin());
    }, [dispatch]);

    const checkStatus = (datetime) => {
        let todayInSeconds = new Date().getTime();
        let expireDayInSeconds = datetime.getTime();

        return todayInSeconds >= expireDayInSeconds
            ? "Đang hoạt động"
            : "Đã hết hạn";
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Bạn có chắc muốn xóa ?",
            showCancelButton: true,
            confirmButtonText: "Xóa",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apiDeleteOnePost(id);
                if (res.status === 200) {
                    window.location.reload();
                }
            }
        });
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await apiGetOnePost(idEdit);
            if (res.status === 200) {
                setDataEdit(res.data.response);
            }
        };
        if (idEdit) {
            fetch();
        }
    }, [idEdit]);

    return (
        <div className="flex flex-col gap-6 ">
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-3xl font-medium">Quản lý bài đăng</h1>
                <select className="outline-none border p-2 border-gray-200 rounded-md">
                    <option value="">Lọc theo trạng thái</option>
                </select>
            </div>

            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="border p-2">Mã tin</th>
                        <th className="border p-2">Ảnh đại diện</th>
                        <th className="border p-2">Tiêu đề</th>
                        <th className="border p-2">Giá</th>
                        <th className="border p-2">Ngày bắt đầu</th>
                        <th className="border p-2">Ngày hết hạn</th>
                        <th className="border p-2">Trạng thái</th>
                        <th className="border p-2">Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {postOfCurrent && postOfCurrent.length > 0 ? (
                        postOfCurrent.map((item) => (
                            <tr key={item?.id}>
                                <td className="border text-center p-2">
                                    {item?.overviews?.code}
                                </td>
                                <td className="border p-2">
                                    <img
                                        src={(() => {
                                            try {
                                                const images = JSON.parse(
                                                    item?.images?.image || "[]"
                                                );
                                                return images?.[0] || "";
                                            } catch (err) {
                                                return "";
                                            }
                                        })()}
                                        alt={`Ảnh đại diện của bài đăng ${item?.overviews?.code}`}
                                        className="w-10 h-10 object-cover rounded-md"
                                    />
                                </td>
                                <td className="border p-2">{item?.title}</td>
                                <td className="border p-2">
                                    {item?.attributes?.price}
                                </td>
                                <td className="border p-2">
                                    {item?.overviews?.created}
                                </td>
                                <td className="border p-2">
                                    {item?.overviews?.expired}
                                </td>
                                {/* <td className='border p-2'>{item?.status || 'Chưa xác định'}</td> */}
                                <td className="border p-2">
                                    {checkStatus(
                                        new Date(
                                            item?.overviews?.expired?.split(
                                                ""
                                            )[3]
                                        )
                                    )}
                                </td>

                                <td className="border p-2 flex-1  flex items-center justify-center gap-4">
                                    <Button
                                        text="Sửa"
                                        bgColor="bg-green-600"
                                        textColor="text-white"
                                        onClick={() => {
                                            setIsEdit(true);
                                            setIdEdit(item.id);
                                        }}
                                    />

                                    <Button
                                        text="Xóa"
                                        bgColor="bg-orange-600"
                                        textColor="text-white"
                                        onClick={() => handleDelete(item.id)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="border text-center p-2">
                                Không có bài đăng nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isEdit && <UpdatePost dataEdit={dataEdit} setIsEdit={setIsEdit} />}
        </div>
    );
};

export default ManagePost;
