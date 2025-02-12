const OutputComponent = ({ output, runningCode }) => {
  return (
    <div className="w-full bg-[#FFF2AF] h-[300px] mt-4 border rounded-2xl p-3 mr-6">
      <h2 className="text-3xl font-bold mb-2">Output</h2>
      <hr />
      <div>{runningCode ? "Running code..." : output}</div>
    </div>
  );
};

export default OutputComponent;
