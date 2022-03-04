/* file: src/components/TimeTheme/FeatherCorpTheme.js */
// brand colors
const fsMain = '#6BBF80';
const fsMainLight = '#4A8C5B'; // lighter version of fsPurple
const cSolitude = '#142617';
//was 230 ^^
// const fsPurple = '#ED7315';
// const fsPurpleLight = '#A14E0E'; // lighter version of fsPurple
// const cSolitude = '#EEEEAF0';
const lightTheme = false;

export default {
    light: lightTheme,
    baseName: 'FlexDark',

    // base theme colors
    colors: {
        tabSelectedColor: fsMain,
        focusColor: fsMain,
        completeTaskColor: fsMain,
        defaultButtonColor: fsMain,
        flexBlueColor: fsMain
    },

    // component overrides
    overrides: {

        // top header
        MainHeader: {
            Container: {
                background: fsMain,
                color: cSolitude
            }
        },

        // left sidebar
        SideNav: {
            Container: {
                background: cSolitude,
                color: fsMain
            },
            Button: {
                background: cSolitude,
                color: fsMain,
                lightHover: !lightTheme
            },
            Icon: {
                color: fsMain
            }
        },

        // admin plugin
        FlexAdmin: {
            DashboardCard: {
                Icon: {
                    backgroundColor: fsMainLight
                }
            }
        }

    }
};