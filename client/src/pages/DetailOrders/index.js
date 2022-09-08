import React from 'react'
import DetailOrders from '../../components/Profile/DetailOrders'
import Breadcrumb from "../../components/BreadCrumb";

const index = () => {
  return (
    <>
    <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb value="Chi tiết đơn đặt hàng" />
      </div>
        <DetailOrders />
    </>
  )
}

export default index