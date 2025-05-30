import axios from "axios";
import "../config/env";
import "dotenv/config";
import { LINE_ACCESS_TOKEN } from "../lib/env";

const apiClient = axios.create({
	baseURL: process.env.LINE_API_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
	},
	timeout: 5000, // タイムアウト（5秒）
});

export default apiClient;
