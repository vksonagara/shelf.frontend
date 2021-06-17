import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function CreateSkeleton({ num, ...props }) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(i);
  }
  return (
    <SkeletonTheme {...props}>
      <div className="flex flex-col">
        {arr.map((val) => {
          return (
            <div className="flex mt-3">
              <Skeleton width={30} height={30} />
              <div className="flex flex-col ml-2">
                <div
                  style={{
                    marginBottom: "-8px",
                  }}
                >
                  <Skeleton width={100} height={10} />
                </div>
                <div>
                  <Skeleton width={150} height={10} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SkeletonTheme>
  );
}

export default CreateSkeleton;
