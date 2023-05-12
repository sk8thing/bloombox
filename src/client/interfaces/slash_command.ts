import { DiscordClient } from "../index"
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

interface Exec {
    (client: DiscordClient, interaction: ChatInputCommandInteraction, ...args: any[]): void
}

export interface SlashCommand {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    exec: Exec
}