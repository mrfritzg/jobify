import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({count, title, icon, color, bcg}) => {
  return (
    <Wrapper color={color} bcg={bcg}>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
        <header>
            <h5 className="title">{title}</h5>
        </header>
    </Wrapper>
  )
}
export default StatItem