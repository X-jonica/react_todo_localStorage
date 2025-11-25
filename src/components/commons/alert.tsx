const AlertSuccessMessage = ({ message }: { message: string }) => {
    return (
        <div className="px-6 py-3 bg-green-500/20 border-2 border-green-500 rounded shadow-lg">
            <p className="text-white text-start text-sm font-semibold">
                {message}
            </p>
        </div>
    );
};

const AlertErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className="px-6 py-3 border-2 border-red-500 bg-red-500/20 rounded shadow-lg">
            <p className="text-white text-start text-sm font-semibold">
                {message}
            </p>
        </div>
    );
};

export { AlertSuccessMessage, AlertErrorMessage };
