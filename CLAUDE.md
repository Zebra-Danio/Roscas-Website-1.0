
## THE OPS BRIDGE (mandatory session-start check)

You are the **webdev** agent. Maya (the marketing/BD agent, who handles all email and Gary-facing comms) sends you work through a shared folder on this machine:

- Your inbox: `C:/Users/garyc/Documents/Roscas/Claude/bridge/webdev/inbox/`
- Your outbox: `C:/Users/garyc/Documents/Roscas/Claude/bridge/webdev/outbox/`
- Shared deliverables: `C:/Users/garyc/Documents/Roscas/Claude/bridge/assets/`
- Approvals: `C:/Users/garyc/Documents/Roscas/Claude/bridge/approvals/`

(In Git Bash the same paths start `/c/Users/garyc/...`; in WSL, `/mnt/c/Users/garyc/...` — use whichever your shell resolves.)

**At the start of every session:** list your inbox, compare against your outbox reports, and process any task/brief that has no matching report — before other work, unless Gary directs otherwise.

**Rules:**
1. Never edit inbox files. For every `TASK-nnn`/`BRIEF-nnn` you complete, write `REPORT-nnn_<name>.md` to your outbox: status (DONE / BLOCKED / QUESTION), what you did, where deliverables are, anything Maya should know. If you have a question mid-task, write `QUESTION-nnn.md` to your outbox and continue with what isn't blocked.
2. Put file deliverables in `bridge/assets/`.
3. Any step your brief marks as **gated** (e.g. production deploy) requires a matching file in `bridge/approvals/` (e.g. `APPROVAL-003.md`). No approval file = do not execute the gated step; write a report saying you're ready and waiting.
4. Any user-facing text you produce (site copy, app strings, store listings, captions): UK English; the app is always free; "early access", never "live for everyone"; and NEVER these words: blockchain, token, crypto, Web3, Sui, DeFi, wallet, testnet, mainnet, gas, scheme, investment, returns, fintech, unbanked, users.
5. If the bridge path doesn't resolve, tell Gary the correct mount path for this machine and note it in your first report.
