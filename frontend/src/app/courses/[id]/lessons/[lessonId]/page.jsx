import React from "react";

const page = async ({ params }) => {
  const { lessonId } = await params;
  return (
    <div>
      <h2>Lessons Details page {lessonId} </h2>
    </div>
  );
};

export default page;
