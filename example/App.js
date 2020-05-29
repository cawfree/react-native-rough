import React, {useEffect, useState, useRef} from 'react';
import {TouchableOpacity, View, StyleSheet, Animated, Dimensions, SafeAreaView, ScrollView, Text} from 'react-native';
import Svg from 'react-native-svg';
import Rough from 'react-native-rough';

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  preview: {
    width,
    height: width,
  },
  activeRow: {
    padding: 10,
    backgroundColor: "#F5F7FF",
  },
  row: {
    padding: 10,
  },
  rowTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#606C71",
  },
  divider: {
    marginLeft: width * 0.05,
    width: width * 0.9,
    backgroundColor: "#2222220F",
    height: 1,
  },
  centerAlign: {
    textAlign: "center",
  },
  title: {
    fontSize: 40,
    color: "#169958",
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 5,
    color: "#606C71",
  },
});

const RectangleExample = () => {

  const padding = 50;

  const {current: x} = useRef(new Animated.Value(padding));
  const {current: y} = useRef(new Animated.Value(padding));
  const {current: size} = useRef(new Animated.Value(0));

  useEffect(() => Animated.timing(size, {
      toValue: width - 2 * padding,
      duration: 500,
      useNativeDriver: true,
    }).start() && undefined, []);

  return (
    <Rough.Rectangle
        x={x}
        y={y}
        width={size}
        height={size}
        hachureAngle={60}
        hachureGap={15}
        fillWeight={3}
        stroke="red"
        strokeWidth={5}
        fill="blue"
      />
  );
};

const ArcExample = () => {
  const padding = 50;

  const {current: x} = useRef(new Animated.Value(width * 0.5));
  const {current: y} = useRef(new Animated.Value(width * 0.5));

  const {current: size} = useRef(new Animated.Value(width - (2 * padding)));
  
  const {current: start} = useRef(new Animated.Value(0));
  const {current: stop} = useRef(new Animated.Value(0.01));

  useEffect(() => Animated.timing(stop, {
    toValue: Math.PI * 2,
    duration: 500,
    useNativeDriver: true,
  }).start() && undefined, []);

  return (
   <Rough.Arc
     seed={10}
     x={x}
     y={y}
     closed
     width={size}
     height={size}
     start={start}
     stop={stop}
     fillStyle="zigzag"
     strokeWidth={4}
     stroke="orange"
     fill="rgba(255,0,255,0.4)"
   />
  );
};

const LinearPathExample = () => {
  const [points] = useState(
    [...Array(10)]
      .map(
        (_, i, orig) => new Animated.ValueXY({x: (i == 0) ? 0 : (i + 1) * (width / orig.length), y: width * 0.5}),
      ),
  );

  useEffect(
    () => {
      Animated.parallel(
        points
          .map(
            point => Animated
              .spring(
                point,
                {
                  toValue: {
                    x: point.x.__getValue(),
                    y: width * Math.random(),
                  },
                  useNativeDriver: true,
                },
              ),
          ),
      ).start();
    },
    [],
  );

  return (
    <Rough.LinearPath
      points={points}
      strokeWidth={5}
      stroke="pink"
    />
  );
};

const LineExample = () => {

  const padding = 50;

  const {current: x} = useRef(new Animated.Value(padding));
  const {current: y} = useRef(new Animated.Value(padding));
  const {current: size} = useRef(new Animated.Value(30));

  useEffect(() => Animated.timing(size, {
      toValue: width - padding,
      duration: 400,
      useNativeDriver: true,
    }).start() && undefined, []);

  return (
    <Rough.Line
      x1={x}
      y1={y}
      x2={size}
      y2={size}
      stroke="purple"
      strokeWidth={30}
    />
  );
};

const CurveExample = () => {
  // draw sine curve
  let points = [];
  for (let i = 0; i < 20; i++) {
    // 4pi - 400px
    let x = (width / 20) * i + 10;
    let xdeg = (Math.PI / 100) * x;
    let y = Math.round(Math.sin(xdeg) * width * 0.4);// + width * 0.5;
    points.push(
      new Animated.ValueXY({x, y}),
    );
  }

  useEffect(
    () => {
      Animated.parallel(
        points
          .map(
            point => Animated
              .spring(
                point,
                {
                  toValue: {
                    x: point.x.__getValue(),
                    y: point.y.__getValue() + (width * 0.5),
                  },
                  useNativeDriver: true,
                },
              ),
          ),
      ).start();
    },
    [],
  );

  return (
    <Rough.Curve
      points={points}
      strokeWidth={5}
      stroke="navy"
    />
  );
};

export default () => {
  const [index, setIndex] = useState(0);
  const [rows] = useState([
    ["Rectangle", "Sketches a rough rectangle.", RectangleExample],
    ["Line", "Draws a cool, hand-drawn looking line between two points.", LineExample],
    ["Arc", "Renders an arc. You know, like a pie chart?", ArcExample],
    ["LinearPath", "Draw a line between array of points.", LinearPathExample],
    ["Curve", "Like a LinearPath, but the points are smoothly interpolated between.", CurveExample],
  ]);
  const Example = rows[index][2];
  return (
    <View
      style={StyleSheet.absoluteFill}
    >
      <SafeAreaView />
      <View
        style={styles.flex}
      >
        <View
          style={styles.preview}
        >
          <Svg
            pointerEvents="none"
            width={width}
            height={width}
          >
            <Example />
          </Svg>
        </View>
        <ScrollView
          style={styles.flex}
        >
          <View
          >
            <Text
              style={[styles.title, styles.centerAlign]}
              children="Rough.js"
            />
            <Text
              style={[styles.subtitle, styles.centerAlign]}
              children="Create graphics with a hand-drawn, sketchy, appearance."
            />
          </View>
          <Text
            style={[styles.title, {padding: 10}]}
            children="Api"
          />
          {rows.map(
            ([rowTitle, rowDescription], i, orig) => (
              <TouchableOpacity
                key={i}
                onPress={() => setIndex(i)}
              >
                <View
                  style={(i === index) ? styles.activeRow : styles.row}
                >
                  <Text
                    style={styles.rowTitle}
                    children={`<Rough.${rowTitle} />`}
                  />
                  {(i === index) && (

                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingTop: 5,
                      }}
                    >
                      <Text
                        children={rowDescription}
                      />
                    </View>
                  )}
                </View>
                <View style={styles.divider} />
              </TouchableOpacity>
            ),
          )}
          <SafeAreaView />
        </ScrollView>
      </View>
    </View>
  );
};
