interface WrapperDashProps {
  children: React.ReactNode;
}

export const WrapperDash = ({ children }: WrapperDashProps) => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg justify-center h-full w-full">
          <div className="flex flex-col md:flex-row justify-center items-center h-full w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
