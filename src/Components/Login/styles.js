export const style = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
  },
  img: {
    width: "100%",
    height: "100vh",
    opacity: 0.4,
    position: "relative",
  },
  imgContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#00095",
    position: "absolute",
    justifyContent:'center',
    alignItems:'center'
  },
  card: {
    left: "50%",
    transform: "translate(-50%,10%)",
    backgroundColor: "white",
    width: "200px",
    position: "absolute",
    borderRadius: "15px",
    boxShadow: "7px 2px 33px 0px rgba(0,0,0,0.36)",
  },

  input: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    boxShadow: "7px 2px 33px 0px rgba(0,0,0,0.36)",
    padding: "5px 10px",
    borderRadius: "8px",
    marginBottom: "10px",
    outline: "none",
    border: "1px solid gray",
    backgroundColor: "#e1e3e8",
  },

  btn: {
    display:'flex',
    backgroundColor: "#5581cf",
    padding: "5px 10px",
    cursor:'pointer',
    height:30,
    borderRadius: "7px",
    border: "none",
    width: "92%",
    color: "#fff",
    boxShadow: "7px 2px 33px 0px rgba(0,0,0,0.36)",
    justifyContent:'center',
    alignItems:'center'
  },
  btnLoading: {
    display:'flex',
    backgroundColor: "rgba(85, 129, 207, 0.7)",
    padding: "5px 10px",
    height:30,
    borderRadius: "7px",
    border: "none",
    width: "92%",
    color: "#fff",
    boxShadow: "7px 2px 33px 0px rgba(0,0,0,0.36)",
    justifyContent:'center',
    alignItems:'center'
  },
};
