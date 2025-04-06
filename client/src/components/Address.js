import React, { memo, useEffect, useState } from "react";
import { Select, InputReadOnly } from "../components";
import { apiGetPublicProvinces, apiGetPublicDistrict } from "../services";

const Address = ({ setPayload, invalidFields, payload, setInvalidFields }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response.status === 200) {
                setProvinces(
                    response?.data.map((item) => {
                        return {
                            ...item,
                            province_id: item.idProvince,
                            province_name: item.name,
                        };
                    })
                );
            }
        };
        fetchPublicProvince();
    }, []);
    useEffect(() => {
        setDistrict("");
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province);
            if (response.status === 200) {
                setDistricts(
                    response.data?.map((item) => ({
                        ...item,
                        district_id: item.idDistrict,
                        district_name: item.name,
                    }))
                );
            }
        };
        province && fetchPublicDistrict();
        !province ? setReset(true) : setReset(false);
        !province && setDistricts([]);
    }, [province]);

    useEffect(() => {
        if (province && district) {
            setPayload((prev) => ({
                ...prev,
                address: `${
                    district
                        ? `${
                              districts?.find(
                                  (item) =>
                                      Number(item.district_id) ===
                                      Number(district)
                              )?.district_name
                          }, `
                        : ""
                }${
                    province
                        ? provinces?.find(
                              (item) =>
                                  Number(item.province_id) === Number(province)
                          )?.province_name
                        : ""
                }`,
                province: province
                    ? provinces?.find(
                          (item) =>
                              Number(item.province_id) === Number(province)
                      )?.province_name
                    : "",
            }));
        }
    }, [province, district]);

    // useEffect(() => {
    //     console.log("payload.address >>> ", payload.address);
    //     if (payload.address && provinces.length) {
    //         const arr = payload.address.split(",").map((item) => item.trim());
    //         setProvince(
    //             provinces.find((item) => item.province_name === arr[1])
    //                 ?.province_id
    //         );
    //     }
    // }, [provinces, payload]);

    // useEffect(() => {
    //     if (payload.address && districts.length) {
    //         const arr = payload.address.split(",").map((item) => item.trim());
    //         setDistrict(
    //             districts.find((item) => item.district_name === arr[0])
    //                 ?.district_id
    //         );
    //     }
    // }, [province, districts, payload]);

    useEffect(() => {
        console.log("payload >>>", payload);
        if (payload.address && provinces.length) {
            const arr = payload.address.split(",").map((item) => item.trim());
            setProvince(
                provinces.find((item) => item.province_name === arr[1])
                    ?.province_id
            );
        }
        if (payload.address && districts.length) {
            console.log(payload.address);
            const arr = payload.address.split(",").map((item) => item.trim());
            console.log(arr[0]);
            setDistrict(
                districts.find((item) => item.district_name === arr[0])
                    ?.district_id
            );
        }
    }, [provinces, districts]);

    return (
        <div>
            <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Select
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        type="province"
                        value={province}
                        setValue={setProvince}
                        options={provinces}
                        label="Tỉnh/Thành phố"
                    />
                    <Select
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        reset={reset}
                        type="district"
                        value={district}
                        setValue={setDistrict}
                        options={districts}
                        label="Quận/Huyện"
                    />
                </div>

                <InputReadOnly
                    label="Địa chỉ chính xác"
                    value={`${
                        district
                            ? `${
                                  districts?.find(
                                      (item) =>
                                          Number(item.district_id) ===
                                          Number(district)
                                  )?.district_name
                              },`
                            : ""
                    } ${
                        province
                            ? provinces?.find(
                                  (item) =>
                                      Number(item.province_id) ===
                                      Number(province)
                              )?.province_name
                            : ""
                    }`}
                />
            </div>
        </div>
    );
};

export default memo(Address);
