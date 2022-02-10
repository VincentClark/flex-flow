/* file: src/components/TimeTheme/FeatherCorpTheme.js */
// brand colors
const fsPurple = '#6BBF80';
const fsPurpleLight = '#4A8C5B'; // lighter version of fsPurple
const cSolitude = '#142617';
//was 230 ^^
// const fsPurple = '#ED7315';
// const fsPurpleLight = '#A14E0E'; // lighter version of fsPurple
// const cSolitude = '#EEEEAF0';
const lightTheme = true;

export default {
    light: lightTheme,
    baseName: 'FlexLight',

    // base theme colors
    colors: {
        tabSelectedColor: fsPurple,
        focusColor: fsPurple,
        completeTaskColor: fsPurple,
        defaultButtonColor: fsPurple,
        flexBlueColor: fsPurple
    },

    // component overrides
    overrides: {

        // top header
        MainHeader: {
            Container: {
                background: fsPurple,
                color: cSolitude
            }
        },

        // left sidebar
        SideNav: {
            Container: {
                background: cSolitude,
                color: fsPurple
            },
            Button: {
                background: cSolitude,
                color: fsPurple,
                lightHover: !lightTheme
            },
            Icon: {
                color: fsPurple
            }
        },

        // admin plugin
        FlexAdmin: {
            DashboardCard: {
                Icon: {
                    backgroundColor: fsPurpleLight
                }
            }
        }

    }
};