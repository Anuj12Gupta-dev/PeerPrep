import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";
import { useAuth } from "../contexts/AuthContext";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?._id === user?.id;
  const isParticipant = session?.participant?._id === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  // find the problem data based on session problem title
  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

  // auto-join session if user is not already a participant and not the host
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, { onSuccess: refetch });

    // remove the joinSessionMutation, refetch from dependencies to avoid infinite loop
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  // redirect the "participant" when session ends
  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  const handleLeaveSession = async () => {
    try {
      if (isHost) {
        await endSessionMutation.mutateAsync(id);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error leaving session:", error);
    }
  };

  const handleRunCode = async () => {
    if (!code) return;

    setIsRunning(true);
    try {
      const result = await executeCode(code, selectedLanguage);
      setOutput(result);
    } catch (error) {
      setOutput({ error: error.message });
    } finally {
      setIsRunning(false);
    }
  };

  if (loadingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-error">Session not found</h1>
          <p className="mt-2 text-base-content/70">The session you're looking for doesn't exist or has ended.</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-4 py-2 bg-primary text-primary-content rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-300">
      <Navbar />

      {/* SESSION HEADER */}
      <div className="bg-base-100 border-b border-base-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{session.problem}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`badge ${getDifficultyBadgeClass(session.difficulty)}`}>
                {session.difficulty}
              </span>
              <span className="text-sm text-base-content/60">
                Hosted by {session.host.name}
              </span>
            </div>
          </div>

          <button
            onClick={handleLeaveSession}
            className="flex items-center gap-2 px-4 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors"
          >
            <PhoneOffIcon className="w-4 h-4" />
            {isHost ? "End Session" : "Leave Session"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          {/* LEFT PANEL - VIDEO & CHAT */}
          <Panel defaultSize={30} minSize={25} maxSize={40} className="bg-base-200">
            {call && channel && chatClient ? (
              <StreamCall call={call}>
                <StreamVideo client={streamClient}>
                  <VideoCallUI channel={channel} chatClient={chatClient} isInitializingCall={isInitializingCall} />
                </StreamVideo>
              </StreamCall>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary/20 transition-colors cursor-col-resize" />

          {/* RIGHT PANEL - CODE EDITOR & OUTPUT */}
          <Panel defaultSize={70} minSize={60} className="flex flex-col">
            <PanelGroup direction="vertical">
              {/* CODE EDITOR */}
              <Panel defaultSize={60} minSize={40} className="p-4">
                <CodeEditorPanel
                  code={code}
                  setCode={setCode}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                  onRunCode={handleRunCode}
                  isRunning={isRunning}
                  problemData={problemData}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary/20 transition-colors cursor-row-resize" />

              {/* OUTPUT */}
              <Panel defaultSize={40} minSize={30} className="p-4">
                <OutputPanel output={output} isRunning={isRunning} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;