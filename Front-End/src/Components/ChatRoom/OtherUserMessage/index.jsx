const OtherUserMessage = (props) => {
  return (
    <div className="flex items-centermb-6 mt-6">
      <img
        className="w-8 h-8 rounded-full mr-4"
        src="https://via.placeholder.com/150"
        alt="Avatar"
      />
      <div className="flex-1">
        <p className="text-sm text-f-gray">Message content</p>
      </div>
    </div>
  );
};

export default OtherUserMessage;
