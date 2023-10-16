import { TableServiceClient, TableClient } from "@azure/data-tables";
import config from "../config";

const CONFIGURATION_TABLE_NAME = "configuration";

const tableServiceClient = TableServiceClient.fromConnectionString(config.tableConnectionString);

const SetConfigValue = async (key, value) => {

    console.log(`Connection string is ${config.tableConnectionString}`);
    await tableServiceClient.createTable(CONFIGURATION_TABLE_NAME);
    const tableClient = TableClient.fromConnectionString(config.tableConnectionString, CONFIGURATION_TABLE_NAME);

    await tableClient.upsertEntity({
        partitionKey: "config",
        rowKey: key,
        value: value
    });
}

const GetConfigValue = async (key) => {
    await tableServiceClient.createTable(CONFIGURATION_TABLE_NAME);
    const tableClient = TableClient.fromConnectionString(config.tableConnectionString, CONFIGURATION_TABLE_NAME);

    const entity = await tableClient.getEntity("config", key);
    return entity.value;
}

export default {
    SetConfigValue: SetConfigValue,
    GetConfigValue: GetConfigValue
}