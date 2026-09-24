"use client"

import { useState } from "react"

// The "Inside SwiftFitness" video. The CMS gives a YouTube link, which a
// plain <video> tag can never play, so a YouTube link shows the poster with
// a play button and only loads YouTube's privacy-enhanced player
// (youtube-nocookie.com) once someone clicks - nothing from YouTube loads
// for visitors who just scroll past. A direct video file still uses the
// normal player; no link at all just shows the poster.
function youTubeId(url) {
    if (typeof url !== "string") return null
    const match = url.trim().match(
        /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})(?:[?&#/].*)?$/
    )
    return match ? match[1] : null
}

export default function HomeDemoVideo({ videoUrl, poster, title = "Inside SwiftFitness Gym" }) {
    const [playing, setPlaying] = useState(false)
    const id = youTubeId(videoUrl)

    if (id) {
        if (playing) {
            return (
                <iframe
                    className="home-demo-video"
                    src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                    title={title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ border: 0 }}
                />
            )
        }
        return (
            <button
                type="button"
                className="home-demo-video home-demo-video-poster"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${title}`}
                style={poster ? { backgroundImage: `url("${poster}")` } : undefined}
            >
                <span className="home-demo-video-play" aria-hidden="true" />
            </button>
        )
    }

    if (videoUrl) {
        return (
            <video className="home-demo-video" controls playsInline preload="metadata" poster={poster}>
                <source src={videoUrl} type="video/mp4" />
            </video>
        )
    }

    return poster ? (
        <div
            className="home-demo-video home-demo-video-poster"
            role="img"
            aria-label={title}
            style={{ backgroundImage: `url("${poster}")`, cursor: "default" }}
        />
    ) : null
}
