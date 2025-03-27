import React, { useState, useEffect } from "react";
import { sampleOrders, logoMap } from "../constant/index";

const getSubdomain = () => {
  const host = window.location.hostname; // Returns "daraz.localhost" OR "daraz.ordermade.com"
  if (host.includes("localhost")) {
    const parts = host.split("."); // Includes port (e.g., daraz.localhost:5173)
    // console.log('parts', parts)
    return parts.length ? parts[0] : null; // Extract 'daraz' from 'daraz.localhost:5173'
  } else {
    const parts = host.split(".");
    return parts.length > 2 ? parts[0] : null; // Extract 'daraz' from 'daraz.ordermade.com'
  }
};

const OrderPage = () => {

	const [orders, setOrders] = useState([]);
	const [logo, setLogo] = useState(logoMap.default);
	const [companyName, setCompanyName] = useState("Company");

	useEffect(() => {
		const subdomain = getSubdomain();
		// console.log("subdomain", subdomain);
		if (subdomain && sampleOrders[subdomain]) {
			setOrders(sampleOrders[subdomain]);
			setLogo(logoMap[subdomain] || logoMap.default); // Set company-specific or default logo
			setCompanyName(
				subdomain.charAt(0).toUpperCase() + subdomain.slice(1)
			); // Capitalize company name
		}
	}, []);

	return (
		<div>
			<img src={logo} alt={`${companyName} logo`} width="150" />
			<h1>Orders for {companyName}</h1>

			{orders.length > 0 ? (
				<table border="1">
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Customer</th>
							<th>Amount</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order.orderId}>
								<td>{order.orderId}</td>
								<td>{order.customerName}</td>
								<td>{order.amount}</td>
								<td>{order.status}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<h3>No orders found.</h3>
			)}
		</div>
	);
};

export default OrderPage;
