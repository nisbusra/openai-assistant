"use client";

import React, { useState } from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
// import WeatherWidget from "../../components/weather-widget";
// import { analyzeContractInput } from "../../utils/weather";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";

interface ContractData {
  background?: string;
  contract_articles?: string[];
  closing_details?: string;
  sufficiency?: string;
}

const FunctionCalling = () => {
  const [contractData, setContractData] = useState<ContractData>({});
  const isEmpty = Object.keys(contractData).length === 0;

  const functionCallHandler = async (call: RequiredActionFunctionToolCall) => {
    if (call?.function?.name !== "analyze_contract_input") return;
    const args = JSON.parse(call.function.arguments);
   
    setContractData(args);
    return JSON.stringify(args);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          {/* <WeatherWidget
         background={contractData.background || "---"}
         contractArticles={contractData.contract_articles || ["---"]}
         closingDetails={contractData.closing_details || "---"}
         sufficiency={contractData.sufficiency || "insufficient"}
         isEmpty={isEmpty}
          /> */}
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
