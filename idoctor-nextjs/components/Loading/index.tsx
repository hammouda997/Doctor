type LoadingProps = {};

const Loading = ({}: LoadingProps) => (
    <div className="p-1.5">
        <div className="flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-n-3 animate-[loaderDots_0.6s_0s_infinite_alternate] dark:bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-n-3 animate-[loaderDots_0.6s_0.3s_infinite_alternate] dark:bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-n-3 animate-[loaderDots_0.6s_0.6s_infinite_alternate] dark:bg-white"></div>
        </div>
    </div>
);

export default Loading;
