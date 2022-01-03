// v3 news component with styled structure and content
import { withTheme } from '@twilio/flex-ui';
import styled from 'react-emotion';
function NewsView() {
    return (
        <Canvas>
            <Container>
                <HeaderMain>
                    <Header>FeatherCorp — All the News!</Header>
                </HeaderMain>

                <Header>In the Business of Doing Good</Header>
                <NewsBody>Congratulations to Kirpal Singh for being awarded the prestigious "Outreach Community Partner of the Year" last month. Kirpal, the VP of Community Relations at Feathercorp, is a consummate professional and we appreciate all his efforts to share our values and dedicate targeted resources to be a better civic partner.</NewsBody>
                <Header>Moving on Up</Header>
                <NewsBody>Cheryl Bautista has been tapped to head up our new Talent Retention division. Following extensive internal recruitment, she has already demonstrated the type of initiative that will be needed to overcome the built-in challenges of the position. "Don't forget the synergistic parallelism we'll use to extend the dialogue," Bautista noted in her first department-wide video call. After numerous studies demonstrated the value of having employees remain active even after onboarding, exhaustive proposals lead to this revolutionary position. Real-time and historical reporting have already begun.</NewsBody>
                <Header>Welcome Aboard!</Header>
                <NewsBody>FeatherCorp welcomes Alexandra Brightley, Binh Nguyen, and Tyree Powers as this month's new hires. This brings us within spitting distance of our recruitment goals for Q3 in IT, Accounting and Operations. Pat Tortuga, VP of Engineering, had this to say regarding the new hires: "Here at FeatherCorp, the get-it-done nature of our hires speaks for itself. We’re not afraid to run it up the flagpole or to get granular! And with this much design-driven mindshare, we don't even need to run out the clock on our streamlined, cutting-edge skillsets."</NewsBody>
            </Container>
        </Canvas>
    );
}

// v3 - styled JSX element definitions
const Canvas = styled("div")`
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      align-items: center;
      background-color: ${props => props.theme.colors.base3};    
    `;

const Container = styled("div")`
      color: ${props => props.theme.calculated.textColor};    
      align-items: center;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      max-width: 100%;
    `;

const HeaderMain = styled("div")`
      border-style: solid;
      border-width: 0px 0px 4px;
      border-color: ${props => props.theme.colors.defaultButtonColor};
      margin-bottom: 1.5em;
      font-size: 2em;
    `;
const Header = styled("div")`
      font-size: 10px;
      font-weight: bold;
      color: ${props => props.theme.SideNav.Container.background};
      letter-spacing: 2px;
      margin: 0 2em;
      font-size: 2.5em;
      font-family: serif;   
    `;

const NewsBody = styled("div")`
      margin: 0.75em 6em 4em 6em;
      text-align: justify;
      font-size: 14px;
      letter-spacing: 1px;
      max-width: 800px;
      color: ${props => props.theme.colors.base9};  
    `;

// v3 export withTheme
export default withTheme(NewsView);