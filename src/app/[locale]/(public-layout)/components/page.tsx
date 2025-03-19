async function getData() {
  // 模拟从服务器获取数据
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getList`,); 
  return data.json();
}

const Page = async () => {
  // 在服务端获取数据
  const data = await getData();
  return (
    <div className="p-5">
      {/* 渲染服务端获取的数据 */}
      <h1>服务端渲染示例</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;
