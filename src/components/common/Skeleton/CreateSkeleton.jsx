import Skeleton from "react-loading-skeleton";

function CreateSkeleton({ num }) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(i);
  }
  return (
    <div className="flex flex-col">
      {arr.map((val) => {
        return (
          <div className="flex mt-4">
            <Skeleton width={30} height={30} />
            <div className="flex flex-col ml-1">
              <Skeleton width={100} height={10} className="block" />
              <Skeleton
                width={150}
                height={10}
                className="block"
                style={{
                  marginBottom: "-50px",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CreateSkeleton;
