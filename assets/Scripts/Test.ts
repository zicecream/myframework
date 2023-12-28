        timeScale = 1.0;
        //@ts-ignore
        game._calculateDT = function (now: number) {
            if (!now) now = performance.now();
                this._deltaTime = now > this._startTime ? (now - this._startTime) / 1000 : 0;
                if (this._deltaTime > Game.DEBUG_DT_THRESHOLD) {
                    this._deltaTime = this.frameTime / 1000;
                }
                this._startTime = now;
                return this._deltaTime * timeScale;
        };
