/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetOnePost } from "../../services";

const DetailPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState();
    const [currentImage, setCurrentImage] = useState("");
    useEffect(() => {
        const fetch = async () => {
            const res = await apiGetOnePost(postId);
            if (res.status === 200) {
                setPost(res?.data?.response);
                setCurrentImage(
                    post?.images?.image
                        ? JSON.parse(post?.images?.image)[0]
                        : ""
                );
            }
        };
        if (postId) {
            fetch();
        }
    }, [postId]);

    console.log(post);
    return (
        <div
            style={{
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                background: "white",
            }}
        >
            <img
                src={currentImage}
                alt="thumbnail"
                style={{
                    width: "100%",
                    height: "340px",
                    objectFit: "cover",
                    marginBottom: "20px",
                }}
            />
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                }}
            >
                {post?.images?.image
                    ? JSON.parse(post?.images?.image).map((item, index) => {
                          return (
                              <img
                                  src={item}
                                  key={index}
                                  alt="image"
                                  style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                      border:
                                          item === currentImage
                                              ? "2px solid blue"
                                              : "1px solid #ccc",
                                  }}
                                  onClick={() => setCurrentImage(item)}
                              />
                          );
                      })
                    : null}
            </div>

            <div>
                <p
                    style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "#dc2626",
                    }}
                    className="mb-[10px]"
                >
                    Mức giá: {post?.attributes?.price}
                </p>
                <p
                    style={{
                        fontSize: "18px",
                        fontWeight: "500",
                    }}
                    className="mb-[10px]"
                >
                    Diện tích: {post?.attributes?.acreage}
                </p>
                <p className="flex items-center mb-[30px]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[20px] h-[20px]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                    </svg>
                    {post?.address}
                </p>
                <div>
                    <p className="text-[20px] font-[500]">Chi tiết</p>
                    <p>{post?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailPost;
