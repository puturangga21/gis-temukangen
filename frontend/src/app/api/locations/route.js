export const dynamic = 'force-static';

export const GET = async (request) => {
  const users = [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Smith',
    },
    {
      id: 3,
      name: 'Alice Johnson',
    },
    {
      id: 4,
      name: 'Bob Brown',
    },
  ];
  return Response.json({
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    data: users,
  });
};
