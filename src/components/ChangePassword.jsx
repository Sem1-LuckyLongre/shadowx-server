import { Link } from "react-router-dom";

export const ChangePassword = () => {
  return (
    <div className="bg-dark-900 text-gray-100 min-h-screen">
      <header className="w-full bg-dark-800 p-4 shadow-md border-b border-dark-700">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-blue-400 flex items-center justify-center">
              <span className="font-bold text-white" id="userInitial">
                U
              </span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-blue-400 bg-clip-text text-transparent">
              Change Password
            </h1>
          </div>
          <Link
            to="/"
            className="text-gray-400 hover:text-primary-400 font-medium flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Home
          </Link>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-dark-800 p-6 rounded-2xl shadow-lg border border-dark-700">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <i className="fas fa-lock text-primary-500 mr-2"></i> Change Your
              Password
            </h2>

            <form
              id="changePasswordForm"
              action="/change-password"
              method="POST"
              className="space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Current Password
                  </label>
                  <div className="input-field bg-dark-700 rounded-lg border border-dark-600 focus-within:border-primary-500 transition-all relative">
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-100 placeholder-gray-500"
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-primary-500 toggle-password"
                      data-target="currentPassword"
                    >
                      <i className="far fa-eye"></i>
                    </button>
                  </div>
                  <p
                    id="currentPasswordError"
                    className="error-message hidden"
                  ></p>
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    New Password
                  </label>
                  <div className="input-field bg-dark-700 rounded-lg border border-dark-600 focus-within:border-primary-500 transition-all relative">
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-100 placeholder-gray-500"
                      placeholder="Enter new password"
                      required
                      minLength="8"
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-primary-500 toggle-password"
                      data-target="newPassword"
                    >
                      <i className="far fa-eye"></i>
                    </button>
                  </div>
                  <p id="newPasswordError" className="error-message hidden"></p>
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters long with at least one
                    uppercase, one lowercase, one number and one special
                    character
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs flex items-center" id="lengthCheck">
                      <i
                        className="fas fa-circle mr-2 text-gray-500"
                        style={{ fontSize: "6px" }}
                      ></i>
                      At least 8 characters
                    </p>
                    <p
                      className="text-xs flex items-center"
                      id="uppercaseCheck"
                    >
                      <i
                        className="fas fa-circle mr-2 text-gray-500"
                        style={{ fontSize: "6px" }}
                      ></i>
                      At least one uppercase letter
                    </p>
                    <p
                      className="text-xs flex items-center"
                      id="lowercaseCheck"
                    >
                      <i
                        className="fas fa-circle mr-2 text-gray-500"
                        style={{ fontSize: "6px" }}
                      ></i>
                      At least one lowercase letter
                    </p>
                    <p className="text-xs flex items-center" id="numberCheck">
                      <i
                        className="fas fa-circle mr-2 text-gray-500"
                        style={{ fontSize: "6px" }}
                      ></i>
                      At least one number
                    </p>
                    <p className="text-xs flex items-center" id="specialCheck">
                      <i
                        className="fas fa-circle mr-2 text-gray-500"
                        style={{ fontSize: "6px" }}
                      ></i>
                      At least one special character
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Confirm New Password
                  </label>
                  <div className="input-field bg-dark-700 rounded-lg border border-dark-600 focus-within:border-primary-500 transition-all relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-100 placeholder-gray-500"
                      placeholder="Confirm new password"
                      required
                      minLength="8"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-primary-500 toggle-password"
                      data-target="confirmPassword"
                    >
                      <i className="far fa-eye"></i>
                    </button>
                  </div>
                  <p
                    id="confirmPasswordError"
                    className="error-message hidden"
                  ></p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-dark-700 gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <i className="fas fa-save mr-2"></i> Update Password
                </button>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
