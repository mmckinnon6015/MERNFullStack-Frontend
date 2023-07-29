import Card from "../partials/Card";

function HomePage() {
    return (
        <Card
        bgcolor="dark"
          header="Welcome to Bad Bank"
          title=""
          text="You can move around using the navigation bar."
          body={(<img src={require(".//bank.png")} className="img-fluid" alt="Responsive image"/>)}
        />
      ); 
}

export default HomePage