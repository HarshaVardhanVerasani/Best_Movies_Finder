import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import no_img from "./no_img.png";
const styles = StyleSheet.create({
  page: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "20px",
  },
  section: {
    padding: "18px",
  },
  img: {
    display: "inline-block",
    margin: "0 auto",
    width: "100px",
    aspectRatio: "1/1",
  },
  title: {
    textAlign: "center",
    marginTop: "10px",
  },
  s_no: {
    marginTop: "19px",
  },
  hr: {
    border: "2px solid black",
    margin: "5px 0px",
  },
});

function PDF({ movies }) {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            {movies
              .map((item, idx) => [
                <Text style={styles.hr} key={idx}></Text>,
                <Text style={styles.s_no} key={idx}>
                  {idx + 1}
                </Text>,
                <Image
                  style={styles.img}
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
                      : no_img
                  }
                  key={idx}
                />,
                <Text style={styles.title} key={idx}>
                  {item.title}
                </Text>,
                <Text style={styles.hr} key={idx}></Text>,
              ])
              .flat()}
          </View>
        </Page>
      </Document>
    </>
  );
}

export default PDF;
