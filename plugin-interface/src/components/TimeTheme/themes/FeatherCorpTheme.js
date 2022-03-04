/* file: src/components/TimeTheme/FeatherCorpTheme.js */
// brand colors
const cTangerine = 'HSL(26, 91%, 55%)';
const cTangerineLight = 'HSL(26, 91%, 93%)'; // lighter version of cTangerine
const cSolitude = 'HSL(280, 16%, 93%)';
//was 230 ^^
// const cTangerine = '#ED7315';
// const cTangerineLight = '#A14E0E'; // lighter version of cTangerine
// const cSolitude = '#EEEEAF0';
const lightTheme = true;

export default {
    light: lightTheme,
    baseName: 'FlexLight',

    // base theme colors
    colors: {
        tabSelectedColor: cTangerine,
        focusColor: cTangerine,
        completeTaskColor: cTangerine,
        defaultButtonColor: cTangerine,
        flexBlueColor: cTangerine
    },

    // component overrides
    overrides: {

        // top header
        MainHeader: {
            Container: {
                background: cTangerine,
                color: cSolitude
            }
        },

        // left sidebar
        SideNav: {
            Container: {
                background: cSolitude,
                color: cTangerine
            },
            Button: {
                background: cSolitude,
                color: cTangerine,
                lightHover: !lightTheme
            },
            Icon: {
                color: cTangerine
            }
        },

        // admin plugin
        FlexAdmin: {
            DashboardCard: {
                Icon: {
                    backgroundColor: cTangerineLight
                }
            }
        }

    }
};