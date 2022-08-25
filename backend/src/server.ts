import app from "./app";

const port: any = process.env.PORT || 5000;

app.listen(port || 5000, () => {
  console.log(`Server started and running on port ${process.env.PORT || 5000}`);
});
