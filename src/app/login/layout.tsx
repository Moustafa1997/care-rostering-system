import ImageComponent from "@/components/ImageComponent/ImageComponent";

export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-[90%] max-w-7xl flex overflow-hidden gap-8 items-center">
          {/* Left Section */}
          <div className="w-1/2 lg:w-[56%] bg-blue-dark1 text-white p-11 lg:p-8 flex flex-col justify-start rounded-md">
            <h1 className="text-5xl font-normal mb-4 text-white leading-tight">
              Contractor <br />
              Management system
            </h1>
            <p className="text-xl text-white mb-10 font-light">
              Efficiently manage your contractors, staff and shifts with our
              comprehensive rostering solutions
            </p>

            <div className="flex gap-4">
              {/* Admin Cards */}
              {["Super Admin", "Contractors"].map((role, index) => (
                <div
                  key={index}
                  className="bg-blue-light2 px-8 py-10 rounded-md w-[250px] h-[300px] text-left"
                >
                  <div className="mb-6">
                    <ImageComponent
                      src="/images/contractor-avatar.svg"
                      alt="Contractor"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="mb-4">
                    <p className="text-2xl font-normal text-white">{role}</p>
                  </div>
                  <div className="mt-6">
                    <p className="text-base font-light text-white">
                      Lorem ipsum ldhrti fksdjd how to work and to do the
                      service
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-1/2 p-10 flex flex-col justify-start">
            <h1 className="text-5xl font-normal mb-6 text-gray-500 leading-tight">
              Welcome
            </h1>
            {/* <div className="flex gap-6 mb-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="login"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
                <span className="text-sm font-medium">Login as Admin</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="login"
                  checked={role === "contractor"}
                  onChange={() => setRole("contractor")}
                />
                <span className="text-sm font-medium">Login as Manager</span>
              </label>
            </div> */}
            {/* <LoginForm role={role} /> */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
