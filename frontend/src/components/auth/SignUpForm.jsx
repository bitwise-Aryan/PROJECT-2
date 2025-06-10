import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

const SignUpForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const queryClient = useQueryClient();

	const { mutate: signUpMutation, isLoading } = useMutation({
		mutationFn: async (data) => {
			const res = await axiosInstance.post("/auth/signup", data);
			return res.data;
		},
		onSuccess: () => {
			toast.success("Account created successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Something went wrong");
		},
	});

	const handleSignUp = (e) => {
		e.preventDefault();
		signUpMutation({ name, username, email, password });
	};

	const inputStyles = "bg-white text-black placeholder:text-gray-500 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full";

	return (
		<form onSubmit={handleSignUp} className="flex flex-col gap-4 bg-gray-100 p-6 rounded-lg max-w-md mx-auto shadow-md">
			<input
				type="text"
				placeholder="Full name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className={inputStyles}
				required
			/>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className={inputStyles}
				required
			/>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className={inputStyles}
				required
			/>
			<input
				type="password"
				placeholder="Password (6+ characters)"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className={inputStyles}
				required
			/>

			<button
				type="submit"
				disabled={isLoading}
				className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
			>
				{isLoading ? <Loader className="size-5 animate-spin mx-auto" /> : "Agree & Join"}
			</button>
		</form>
	);
};

export default SignUpForm;