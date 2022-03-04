/* file: src/components/TimeTheme/FeatherCorpTheme.js */
// brand colors
const fsPurple = 'HSL(272, 68%, 66%)';
const fsPurpleLight = 'HSL(272, 38%, 96%)'; // lighter version of fsPurple
const cSolitude = 'HSL(272, 38%, 96%)';
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