import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { Image, View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

type TabIconProps = {
  focused: boolean;
  icon: any;
  title: string;
};

function TabIcon({ focused, icon, title }: TabIconProps) {
  if (focused) {
    return (
      <View style={tabIconStyles.activeTabContainer}>
        <Image
          style={[tabIconStyles.icon, tabIconStyles.activeIcon]}
          source={icon}
          tintColor={colors.blackHighlightBackground}
        />
        <Text style={tabIconStyles.activeText}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={tabIconStyles.inactiveTabContainer}>
      <Image
        style={[tabIconStyles.icon, tabIconStyles.inactiveIcon]}
        source={icon}
        tintColor={colors.lightgreyDetailsText}
      />
    </View>
  );
}

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Save" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="fetch_display"
        options={{
          title: "Fetch Display",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.person}
              title="Fetch Display"
            />
          ),
        }}
      /> */}
    </Tabs>
  );
}

const TAB_BAR_HEIGHT = 50;
const TAB_MARGIN_TOP = 10;

const tabIconStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  icon: {
    width: 20,
    height: 20,
  },

  /* ---------- Active Tab ---------- */
  activeTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.zattooOrange,

    minWidth: TAB_BAR_HEIGHT * 2,
    minHeight: TAB_BAR_HEIGHT + 10,
    marginTop: TAB_MARGIN_TOP,
    borderRadius: 999,
    overflow: "hidden",
    paddingHorizontal: 16,
  },
  activeIcon: {},
  activeText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: colors.blackHighlightBackground,
  },

  /* ---------- Inactive Tab ---------- */
  inactiveTabContainer: {
    width: "100%",
    height: "100%",
    marginTop: TAB_MARGIN_TOP,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveIcon: {},
});

const styles = StyleSheet.create({
  /* ---------- Tab Bar ---------- */
  tabBar: {
    backgroundColor: colors.blackHighlightBackground,
    borderRadius: 50,
    height: TAB_BAR_HEIGHT,
    marginHorizontal: 20,
    marginBottom: 36,

    position: "absolute",
    overflow: "hidden",

    borderWidth: 1,
    borderColor: colors.blackBorderColor,

    paddingBottom: 0, // removes the unwanted padding
  },
  tabBarItem: {
    // borderWidth: 1,
    // borderColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
