import './LoadingProgressBar.scss';

export function LoadingProgressBar({ step = 1, numberOfSteps = 4 }) {
  if (step > numberOfSteps)
    console.log('step cannot be greater than numberOfSteps');

  return (
    <div className="loading-progress-bar">
      {Array.from({ length: numberOfSteps }, (_, i) => {
        const isCompleted = step - 1 > i;
        const isLoading = step - 1 === i;

        return (
          <div key={i} className={`loading-progress-bar__progress `}>
            <div
              className={`loading-progress-bar__progress__indicator ${
                isCompleted ? 'completed' : ''
              } ${isLoading ? 'animated' : ''}`}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
