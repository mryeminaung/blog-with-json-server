const ChangePassword = () => {
	return (
		<form className="max-w-2xl">
			<div className="mb-5">
				<label
					htmlFor="new-password"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Old Password
				</label>
				<input
					type="password"
					id="new-password"
					name="oldPwd"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					required
				/>
			</div>
			<div className="mb-5">
				<label
					htmlFor="confirm-pwd"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					New Passowrd
				</label>
				<input
					type="password"
					id="confirm-pwd"
					name="newPwd"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					required
				/>
			</div>
			<div className="flex justify-end">
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Change
				</button>
			</div>
		</form>
	);
};

export default ChangePassword;
