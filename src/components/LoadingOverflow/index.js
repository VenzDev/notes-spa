import { CircularProgress } from "@material-ui/core";

const LoadingOverflow = () => {
  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  };

  return (
    <div style={styles}>
      <CircularProgress />
    </div>
  );
};

export default LoadingOverflow;
