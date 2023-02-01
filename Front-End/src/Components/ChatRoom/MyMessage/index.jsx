const MyMessage = (props) => {
  return (
    <div className="flex items-center mb-6 mt-6 text-right ">
      <div className="flex-1 rounded-lg">
        <p className="text-sm text-f-gray">Message content</p>
      </div>
      <img
        className="w-8 h-8 rounded-full ml-4"
        src="https://via.placeholder.com/150"
        alt="Avatar"
      />
    </div>
  );
};
export default MyMessage;
